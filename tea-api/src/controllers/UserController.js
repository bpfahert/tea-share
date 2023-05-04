const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const User = require("../models/user");
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const upload = multer({dest: './public/images/'});
const mongoose = require('mongoose');

exports.user_list = (req, res) => {
  User.find({}, "username")
  .sort({username: 1})
  .exec(function (err, userlist) {
    if (err) {
      return next(err);
    }
    res.json(userlist);
  });
};

