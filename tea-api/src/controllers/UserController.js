const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const User = require("../models/User");
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const { createSecretToken } = require('../util/Token');
const jwt = require("jsonwebtoken");
const upload = multer({dest: './public/images/'});
const mongoose = require('mongoose');

exports.userVerification = (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ status: false })
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
     return res.json({ status: false })
    } else {
      const user = await User.findById(data.id)
      if (user) return res.json({ status: true, user: user.username })
      else return res.json({ status: false })
    }
  })
}
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

exports.new_user = [
  body("username", "Please enter a username").trim().isLength({min: 2}).escape(),
  body("password").trim().isLength({min: 2}).escape(),
  body("favoritetea"),
  body("email"),
  body("about"),
  (req, res, next) => {
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
        const token = createSecretToken(user._id);
        res.cookie("token", token, {
          withCredentials: true,
          httpOnly: false,
        });
        res.redirect("http://localhost:3000");
      })
    })
  }
]