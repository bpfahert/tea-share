
// Import middleware
require('dotenv').config();
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


//Import routers
const userRouter = require("./src/routes/user");
const teaRouter = require("./src/routes/teas");

const app = express();

// Connect to mongoDBAtlas with mongoose
const mongoose = require("mongoose");
const mongoDB = process.env.MONGOURL;

mongoose.connect(mongoDB, { useNewURLParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'));

//Set Middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser);

// Add routers to middleware
app.use("/teas", teaRouter);
app.use("/user", userRouter);

//Add error handling middleware
let catch404 = (req, res, next) => {
    next(createError(404));
};

let errorHandler = (err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    res.status(err.status || 500);
    res.render("error");
};

app.use(catch404);
app.use(errorHandler);

module.exports = app;