const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;

const strategy = new LocalStrategy(
    {
        usernameField: 'username',
        passwordField: 'password'
    },
    (username, password, done) => {
        User.findOne({ 'local.username': username }, (err, userMatch) => {
            if(err) {
                return done({ db: `Error occured: ${err}`});
            };
            if(!userMatch) {
                return done(null, false, { username: 'Incorrect username' });
            };
            if(!userMatch.checkPassword(password, userMatch.local.password)) {
                return done(null, false, { password: 'Incorrect password' });
            };
            return done(null, userMatch);
        })
    }
)

module.exports = strategy;