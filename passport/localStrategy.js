const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;

const strategy = new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    (email, password, done) => {
        User.findOne({ 'email': email }, (err, userMatch) => {
            if(err) {
                return done({ errmsg: `Error occured: ${err}`});
            };
            if(!userMatch) {
                return done(null, false, { errmsg: 'Incorrect email' });
            };
            if(!userMatch.local.password) {
                return done(null, false, { errmsg: 'Login through Oauth please' });
            }
            if(!userMatch.checkPassword(password, userMatch.local.password)) {
                return done(null, false, { errmsg: 'Incorrect password' });
            };
            return done(null, userMatch);
        })
    }
)

module.exports = strategy;