const passport = require("passport");
const LocalStrategy = require("./localStrategy");
const User = require ("../../src/models/User");

passport.serializeUser(function (user, done) {
    done(null, user.id);
  });
  

passport.deserializeUser(async function(id, done) {
    try {
        const user = await User.findById(id).exec();
        done(null, user);
    } catch(err) {
        done(err);
    };
});

passport.use(LocalStrategy);

module.exports = passport;