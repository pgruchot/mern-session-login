const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('../passport');

router.get('/facebook', passport.authenticate('facebook', { scope: ['public_profile', 'email'] }));
router.get('/facebook/callback', passport.authenticate('facebook', {
    failureRedirect: 'http://localhost:3000/login'
}), function(req, res) {
    res.redirect("http://localhost:3000/");
}
);

router.get('/user', (req, res) => {
    console.log('---- user ----');
    console.log(req.user);
    if(req.user) {
        return res.json({ user: req.user });
    } else {
        return res.json({ user: null });
    }
})

router.post(
    '/login', (req, res, next) => {
        console.log(req.body);
        console.log('----');
        next();
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

router.post('/logout', (req, res) => {
    if(req.user) {
        req.session.destroy();
        res.clearCookie('connect.sid');
        return res.json({msg: 'logging out ' });
    } else {
        return res.json({ msg: 'no user to log out' });
    }
});

router.post('/signup', (req, res) => {
    const { username, password } = req.body;
    //validation needed here
    User.findOne({ 'local.username': username }, (err, userMatch) => {
        if(userMatch) {
            return res.json({
                error: `Sorry, we already have one of you ${username} in here`
            });
        }
        const newUser = new User({
            'local.username': username,
            'local.password': newUser.hashPassword(password),
        });
        newUser.save((err, savedUser) => {
            
            if(err) 
                return res.json(err);
            return res.json(savedUser);
        });
    });
})
module.exports = router;