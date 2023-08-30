
// Import middleware and passport configuration

const createError = require('http-errors');
const express = require('express');
const multer = require('multer');
const path = require('path');
const session = require('express-session');
const passport = require('./server/passport/index');
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const User = require("./src/models/User");

require('dotenv').config();


//Import routers
const LoginRouter = require("./src/routes/login");
const userRouter = require("./src/routes/user");
const teaRouter = require("./src/routes/teas");

const app = express();

// Connect to mongoDBAtlas with mongoose
const mongoose = require('mongoose');
const mongoDB = process.env.MONGO_URI;

mongoose.connect(mongoDB, { useNewURLParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'));

//Set Middleware

app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ['GET','POST', 'OPTIONS'],
  })
);


app.use(session({secret: 'cat', resave: false, saveUninitialized: true, cookie: {maxAge: 1000 * 60 * 60 * 48}}));
app.use(cookieParser('cat'));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(passport.initialize());
app.use(passport.session());

// app.use((req, res, next) => {
//   console.log(req.session);
//   console.log(req.user);
//   next();
// })

// Add routers to middleware
app.use("/auth", LoginRouter);

// Check authentication on every request
app.use((req, res, next) => {
  if (req.isAuthenticated()) {
      next();
  } else {
      res.status(401).json({message: "Please log in to use Tea Share"});
  }
});

app.use("/teas", teaRouter);
app.use("/user", userRouter);

// Get user info
app.get('/user/getuser', (req, res) => {
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
})

//Add error handling middleware
let catch404 = (req, res, next) => {
    next(createError(404));
};

let errorHandler = (err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    res.status(err.status || 500);
    res.json({ error: err });
};

app.use(catch404);
app.use(errorHandler);

module.exports = app;