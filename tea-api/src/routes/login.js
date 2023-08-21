const express = require("express");
const router = express.Router();
const passport = require('passport');
const strategy = require("../../server/passport/localStrategy");
const userController = require("../controllers/UserController");

// TODO: AFTER CONTEXT IS SET UP - INSTEAD OF SUCCESS REDIRECT, SEND A JSON WITH USERNAME TO CONTEXT STATE. NEED TO CHANGE LOGIN FORM TO POST FETCH REQUEST INSTEAD OF ANCHOR.

router.post("/login", passport.authenticate('local', {
    failureRedirect: "http://localhost:3000/", successRedirect: "http://localhost:3000/home"}));

router.get("/logout", (req, res, next) => {
    req.logout(function(err) {
        if (err) {
          return next(err);
        }
        res.redirect('http://localhost:3000/');
    });
});

router.post("/create", userController.new_user);


module.exports = router;