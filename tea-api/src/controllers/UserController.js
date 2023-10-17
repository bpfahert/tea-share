const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const User = require("../models/User");
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const upload = multer({dest: './public/images/'});
const mongoose = require('mongoose');

// Get all users
exports.user_list = (req, res) => {
  User.find({})
  .sort({username: 1})
  .exec(function (err, userlist) {
    if (err) {
      return next(err);
    }
    res.json(userlist);
  });
};

// Get user details for user info page
exports.get_user_info = (req, res, next) => {
  User.findById(req.params.id).select("-password").populate("teas_added favorite_teas _id").exec((err, user) => {
      if(err) {
        return next(err);
      }
      if (user === null) {
        const err = new Error ("User does not exist or has been deleted!");
        err.status = 404;
        return next(err);
      }
      res.json(user);
    })
}

// Create a new user
exports.new_user = [
  body("username", "Please enter a username").trim().isLength({min: 2}).escape(),
  body("password").trim().isLength({min: 2}).escape(),
  body("favoritetea"),
  body("email").isEmail().withMessage("Invalid email address"),
  body("about"),
  async (req, res, next) => {
    const usernameTaken = await User.exists({username: req.body.username});

    if(usernameTaken !== null) {
      return res.json({error: "That username is already taken."});
    }
    
    const errors = validationResult(req);

    const user = new User({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      favorite_tea_type: req.body.favoritetea,
      about: req.body.about,
      notificationStatus: false,
    });

    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
      if (err) {
        return next(err);
      }
      user.password = hashedPassword;
      user.save((err) => {
        if (err) {
          return next(err);
        }
        req.login(user, function(err) {
          if (err) { 
            return next(err); 
          }
          return res.status(200).json({user: req.body.username});
        });
      })
    })
  }
]

// Get logged in user's info
exports.get_current_user = (req, res, next) => {
  if (req.user) {
    User.findOne({username: req.user.username}).select("-password").populate("recommended_teas.tea_rec recommended_teas.recommended_by saved_teas teas_added favorite_teas _id").exec(function (err, currentUser) {
      if (err) {
        return next(err);
      }
    res.json(currentUser);
    });
  } else {
    res.json({ user: null });
  }
}

// Acknowledge a new recommendation from another user
exports.acknowledge_notification = (req, res, next) => {
  User.findOne({username: req.user.username}).exec((err, self) => {
    if(err) {
      return next(err);
    }
    self.notificationStatus = false;
    self.save((err) => {
      if(err) {
        return next(err);
      }
    })
  })
  res.redirect("https://tea-share-front-end-production.up.railway.app/");
}