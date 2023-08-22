const express = require("express");
const router = express.Router();
const passport = require('passport');
const strategy = require("../../server/passport/localStrategy");
const userController = require("../controllers/UserController");

// TODO: AFTER CONTEXT IS SET UP - INSTEAD OF SUCCESS REDIRECT, SEND A JSON WITH USERNAME TO CONTEXT STATE. NEED TO CHANGE LOGIN FORM TO POST FETCH REQUEST INSTEAD OF ANCHOR.

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

router.post("/create", userController.new_user);


module.exports = router;


// TODO: CODE LOGOUT FUNCTION WITH DISPATCH AND DELETING LOCAL STORAGE INFO. MAKE NAVBAR UPDATE WHEN LOGGED IN. MAKE SIGNUP REDIRECT IF USER IS NULL IN CONTEXT.