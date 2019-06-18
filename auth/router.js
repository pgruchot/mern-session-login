const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('../passport');


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
        return res.json({ user: req.user });
    } else {
        return res.json({ user: null });
    }
})

//Login request for passport local
router.post(
    '/login', (req, res) => {
        console.log(req.body);
        console.log('----');
    },
    passport.authenticate('local'),
    (req, res) => {
        console.log('POST to /login');
        const user = JSON.parse(JSON.stringify(req.user));
        const cleanUser = Object.assign({}, user);
        if(cleanUser.local) {
            console.log(`Deleting ${cleanUser.local.password}`);
            delete cleanUser.local.password;
        }
        res.json({ user: cleanUser });
    }
);

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
    const { username, firstName, lastName, email, password, password2 } = req.body;
    //validation needed here

    //check db for duplicate email or username
    User.findOne({$or:[{email: email},{'local.username': username}]}, (err, userMatch) => {
        if(userMatch) {
            return res.json({
                errmsg: `Sorry, we already have one of you ${email} or ${username} in here`
            });
        }
        //now check if passwords match
        else if(password !== password2) {
            return res.json({
                errmsg: 'Dont you think that passwords should match?'
            });
        }
        //everything k, create user
        else {
            
            //every field if assigned so that empty db wont create half-document schema
            let newUser = new User();
                newUser.local.username = username;
                newUser.local.password = newUser.hashPassword(password);
                newUser.firstName = firstName;
                newUser.lastName = lastName;
                newUser.email = email;
                newUser.facebook.facebookId = '';
                newUser.photos = [];
            
            //save user with assigned properties
            newUser.save((err) => {
                if (err) {
                    return res.json({
                        errmsg: `Error while saving the user to database: ${err}`,
                    });
                } else {
                    return res.json({ errmsg: '' });
                }
            });
            
        }
    });
  
    
})
module.exports = router;