const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('../passport');
const validateSignupInput = require('../validation/signup');
const validateLoginInput = require('../validation/login');

//passport routes for Oauth providers, react href get requests
router.get('/facebook', passport.authenticate('facebook', { scope: ['public_profile', 'email'] }));
router.get('/facebook/callback', passport.authenticate('facebook', {
    failureRedirect: 'http://localhost:3000/login'
}), function(req, res) {

    res.redirect("http://localhost:3000/");
}
);

//get user data route if authenticated
router.get('/user', (req, res) => {
    console.log('---- user ----');
    console.log(req.user);
    if(req.user) {
        const user = JSON.parse(JSON.stringify(req.user));
        const cleanUser = Object.assign({}, user);
        if(cleanUser.local) {
            delete cleanUser.local.password;
        }
        return res.json({ user: cleanUser });
    } else {
        return res.json({ user: null });
    }
})


router.post('/login', (req, res, next) => {
    const { errors, isValid } = validateLoginInput(req.body);
    console.log(isValid);
    if(!isValid) {
        return res.json({'errors': errors});
    } else {
        next();
    }

} ,function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
        return next(err); // will generate a 500 error
        }

        // Generate a JSON response reflecting authentication status
        if (!user) {
        return res.json({'errors': info});
        }
        // ***********************************************************************
        // "Note that when using a custom callback, it becomes the application's
        // responsibility to establish a session (by calling req.login()) and send
        // a response."
        // Source: http://passportjs.org/docs
        // ***********************************************************************
        req.login(user, loginErr => {
        if (loginErr) {
            return next(loginErr);
        }
        console.log('POST to /login');
        const cleanUser = Object.assign({}, user._doc);
        if(cleanUser.local) {
            delete cleanUser.local.password;
        }
        return res.json({ user: cleanUser});
        });      
    })(req, res, next);
    });


//logout route
router.post('/logout', (req, res) => {
    if(req.user) {
        req.session.destroy();
        res.clearCookie('connect.sid');
        return res.json({msg: 'logging out ' });
    } else {
        return res.json({ msg: 'no user to log out' });
    }
});

//passport local signup route
router.post('/signup', (req, res) => {
    const { username, email, password, password2 } = req.body;
    //validation needed here
    const { errors, isValid } = validateSignupInput(req.body);
    if(!isValid) {
        return res.json({'errors': errors});
    }
    //check db for duplicate email or username
    User.findOne({'local.username': username}, (err, userMatch) => {
        if(userMatch) {
            return res.json({
                'errors': {username: `Username ${username} duplicate`}
            });
        }
        //everything k, create user
        else {
            
            let newUser = new User();
                newUser.local.username = username;
                newUser.local.password = newUser.hashPassword(password);
                newUser.email = email;

            //save user with assigned properties
            newUser.save((err) => {
                if (err) {
                    return res.json({
                        'errors': {db: `Error while saving the user to database: ${err}`}
                    });
                } else {
                    return res.json({
                        'errors': ''
                    });
                }
            });
            
        }
    });
  
    
})
module.exports = router;