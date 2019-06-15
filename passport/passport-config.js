const passport = require('passport');
const LocalStrategy = require('./localStrategy');
const FacebookStrategy = require('./facebookStrategy');
const User = require('../models/user');

passport.serializeUser((user, done) => {
    console.log('---- serializing user ----');
    console.log(user);
    console.log('----');
    done(null, { _id: user._id });
});

passport.deserializeUser((id, done) => {
    console.log('---- deserializing user ----');
    User.findOne(
        { _id: id },
        'firstName lastName email photos local.username',
        (err, user) => {
            console.log('---- deserializing this guy ----');
            console.log(user);
            console.log('----');
            done(null, user);
        }
    );
})

passport.use(LocalStrategy);
passport.use(FacebookStrategy);