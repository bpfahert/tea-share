
// Import middleware

const createError = require('http-errors');
const express = require('express');
const multer = require('multer');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const User = require("./src/models/User");

const { createSecretToken } = require("./src/util/Token");
require('dotenv').config();


//Import routers
const userRouter = require("./src/routes/user");
const teaRouter = require("./src/routes/teas");

const app = express();

// Connect to mongoDBAtlas with mongoose
const mongoose = require('mongoose');
const mongoDB = process.env.MONGO_URI;

mongoose.connect(mongoDB, { useNewURLParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'));

// Set password middleware
  passport.use(
    new LocalStrategy(async(username, password, done) => {
      try {
        const user = await User.findOne({ username: username });
        if (!user) {
          return done(null, false, { message: "Username does not exist" });
        };
        bcrypt.compare(password, user.password, (err, res) => {
          if (res) {
            return done(null, user);
          }
          else {
            return done(null, false, {message: "Incorrect password!"});
          }
        })
      } catch(err) {
        return done(err);
      };
    })
  );
  


// Set passport serialize/deserialize

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
  try {
    const user = await User.findById(id).exec();
    done(null, user);
  } catch(err) {
    done(err);
  };
});


//Set Middleware


app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);


app.use(session({secret: 'cat', resave: false, saveUninitialized: true}));
app.use(cookieParser('cat'));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(passport.initialize());
app.use(passport.session());

// Add routers to middleware
app.use("/teas", teaRouter);
app.use("/user", userRouter);

app.get('/user/getuser', (req, res) => {
  if (req.user) {
    User.findOne({username: req.user.username}).select("-password").populate("recommended_teas.tea_rec saved_teas teas_added favorite_teas _id").exec(function (err, currentUser) {
      if (err) {
        return next(err);
      }
    res.json({ user: currentUser });
    });
  } else {
    res.json({ user: null });
  }
})

// Login and logout handlers

app.post(
    "/user/login", 
    passport.authenticate("local", {
      failureRedirect: "http://localhost:3000/user/createaccount"
    }), function(req, res) {
      const token = createSecretToken(req.user._id);
      res.cookie("token", token, {
        withCredentials: true,
        httpOnly: false,
      });
      res.redirect("http://localhost:3000");
    }
);
  
app.get("/user/logout", (req, res, next) => {
  req.logout(function(err) {
    if (err) {
      return next(err);
    }
    res.clearCookie("token");
    res.redirect("http://localhost:3000/createaccount");
  });
});

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