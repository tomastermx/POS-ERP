
const passport = require('passport');

const initializePassport = require('./passport');

const LocalStrategy = require('../auth/passport-local');


initializePassport(passport);

passport.use(LocalStrategy);




