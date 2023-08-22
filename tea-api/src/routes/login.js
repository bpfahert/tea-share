const express = require("express");
const router = express.Router();
const passport = require('passport');
const strategy = require("../../server/passport/localStrategy");
const userController = require("../controllers/UserController");

router.post('/login', 
    passport.authenticate('local'), (req, res) => {
        res.status(200).json({user: req.user.username});
    });

router.get("/logout", (req, res, next) => {
    req.logout(function(err) {
        if (err) {
          return next(err);
        }
        res.status(200).json({message: 'logged out'});
    });
});

router.post("/signup", userController.new_user);

module.exports = router;