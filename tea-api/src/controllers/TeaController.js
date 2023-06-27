const Tea = require("../models/Tea");
const User = require("../models/User");
const { body, validationResult} = require("express-validator");
const async = require("async");
const path = require('path');
const fs = require('fs');
const user = require('../models/User');

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

exports.get_all_teas = async (req, res, next) => {
  const teas = await Tea.find({});
  res.status(200).json(teas);
}

exports.tea_create_post = [
  body("tea_name").trim().isLength({min: 2}).escape().withMessage("Please enter a tea name"),
  body("brand").trim().isLength({min: 2}),
  body("type"),
  body("rating"),
  body("notes").trim(),
  (req, res, next) => {

    const errors = validationResult(req);

    const tea = new Tea({
      tea_name: req.body.teaname,
      type: req.body.type,
      brand: req.body.brand,
      rating: req.body.rating,
      notes: req.body.notes,
      created_on: new Date(),
      created_by: req.user._id,
    });
    User.findById(tea.created_by)
    .exec((err, creator) => {
      if (err) {
        return next(err);
      }
      if (creator === null) {
        const err = new Error ("User does not exist!");
        err.status = 404;
        return next(err);
      }
      creator.teas_added.push(tea._id);
      creator.save((err) => {
        if(err) {
          return next(err);
        }
      })
    })

    tea.save((err) => {
      if(err) {
        return next(err);
      }
      res.redirect("http://localhost:3000");
    })
  }
];


  