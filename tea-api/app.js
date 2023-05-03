
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


const app = express();

//Set Middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser);

// Add routers to middleware


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