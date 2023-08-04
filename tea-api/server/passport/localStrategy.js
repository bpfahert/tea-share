const User = require("../../src/models/User");
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require("bcryptjs");

const strategy = new LocalStrategy(
    async(username, password, done) => {
      try {
        const user = await User.findOne({ username: username });
        if (!user) {
          return done(null, false, { message: "Username does not exist" });
        };
        bcrypt.compare(password, user.password, (err, res) => {
          if (res) {
            return done(null, user);
          }
          else {
            return done(null, false, {message: "Incorrect password!"});
          }
        })
      } catch(err) {
        return done(err);
      };
    })

module.exports = strategy;