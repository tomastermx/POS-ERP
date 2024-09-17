

const passport = require('passport');

passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null,  user.id );
  });
  
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});