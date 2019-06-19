const passport = require('passport');
const LocalStrategy = require('./localStrategy');
const FacebookStrategy = require('./facebookStrategy');
const User = require('../models/user');

passport.serializeUser((user, done) => {
    console.log('---- serializing user ----');
    done(null, { _id: user._id });
});

passport.deserializeUser((id, done) => {
    console.log('---- deserializing user ----');
    User.findOne(
        { _id: id },
        'firstName lastName email photos local.username',
        (err, user) => {
            console.log('---- deserializing this guy ----');
            done(null, user);
        }
    );
})

passport.use(LocalStrategy);
passport.use(FacebookStrategy);

module.exports = passport;