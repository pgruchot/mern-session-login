const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');

const keys = require('./config/keys.js');

const server = express();
const PORT = process.env.PORT || 5000;

server.use(morgan('dev'));
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(session({
    secret: keys.session.secret,
    resave: false,
    saveUninitialized: false,
}));
server.use(passport.initialize());
server.use(passport.session());

server.use('/auth', require('./auth/router.js'));

mongoose.connect(keys.mongoDB.dbURI, {useNewUrlParser: true}).then(
    () => {
        console.log('Connected to database :)');
    }
).catch(err => {
    console.log('Cant connect to database :(');
    console.log(err);
});

//error handler
server.use(function(err, req, res, next) {
    console.log('-------- error --------');
    console.error(err.stack);
    res.status(500);
});

server.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
})