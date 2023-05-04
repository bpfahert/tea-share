const Tea = require("../models/tea");
const User = require("../models/user");
const { body, validationResult} = require("express-validator");
const async = require("async");
const path = require('path');
const fs = require('fs');

const mongoose = require("mongoose");

exports.index = (req, res, next) => {
    Tea.findById(req.params.id).exec((err, tea) => {
        if(err) {
          return next(err);
        }
        if (tea === null) {
          const err = new Error ("Tea does not exist or has already been deleted!");
          err.status = 404;
          return next(err);
        }
        res.json(tea);
      })
}