const Tea = require("../models/Tea");
const User = require("../models/User");
const { body, validationResult} = require("express-validator");
const async = require("async");
const path = require('path');
const fs = require('fs');
const user = require('../models/User');
const multer = require('multer');

const upload = multer({dest: '../tea-api/public/images/'});

const mongoose = require("mongoose");

exports.index = (req, res, next) => {
    Tea.findById(req.params.id).populate("created_by _id").exec((err, tea) => {
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
  upload.single('teaimg'),
  body("tea_name").trim().isLength({min: 2}).escape().withMessage("Please enter a tea name"),
  body("brand").trim().isLength({min: 2}),
  body("type"),
  body("rating"),
  body("notes").trim(),
  (req, res, next) => {
    const uploadedImage = {
      teaImage: req.file ? {
        data: fs.readFileSync(path.join(__dirname + "/../../public/images/" + req.file.filename)),
      contentType: "image/png"
      } : ""
    }

    const errors = validationResult(req);

    const tea = new Tea({
      tea_name: req.body.teaname,
      type: req.body.type,
      brand: req.body.brand,
      rating: req.body.rating,
      notes: req.body.notes,
      created_on: new Date(),
      created_by: req.user._id,
      img: uploadedImage.teaImage,
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

exports.tea_recommend_post = [
  body("recommendedtea"),
  body("currentuser"),
  body("user"),
  body("recmessage"),
  (req, res, next) => {
    const errors = validationResult(req);
    User.findById(req.body.user).exec((err, friend) => {
      if(err) {
        return next(err);
      }
      let tea_obj = {
        tea_rec: req.body.recommendedtea,
        recommended_by: req.body.currentuser,
        message: req.body.recmessage,
      };
      friend.recommended_teas.push(tea_obj);
      friend.notificationStatus = true;

      friend.save((err) => {
        if(err) {
          return next(err);
        }
        res.redirect("http://localhost:3000");
      })
  })
  }
];

exports.tea_favorite_get = (req, res, next) => {
  console.log(req.params.id);
  Tea.findById(req.params.id).exec((err, tea) => {
    if(err) {
      return next(err);
    }
    if (tea === null) {
      const err = new Error ("Tea does not exist!");
      err.status = 404;
      return next(err);
    }
    User.findOne({username: req.user.username}).exec((err, self) => {
      if(err) {
        return next(err);
      }
      self.favorite_teas.push(tea);

      self.save((err) => {
        if(err) {
          return next(err);
        }
      })
      
    })
    res.redirect(`http://localhost:3000/teas/${req.params.id}`);
  })
  };