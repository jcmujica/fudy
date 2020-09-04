"use strict";

var User = require("../models/user");

var jwt = require("jsonwebtoken"); // to generate signed token


var expressJwt = require("express-jwt"); // for authorization check


var _require = require("../helpers/dbErrorHandler"),
    errorHandler = _require.errorHandler;

exports.signup = function (req, res) {
  var user = new User(req.body);
  user.save(function (err, user) {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }

    user.salt = undefined;
    user.hashed_password = undefined;
    res.json({
      user: user
    });
  });
};

exports.signin = function (req, res) {
  // find the user based on email
  var _req$body = req.body,
      email = _req$body.email,
      password = _req$body.password;
  User.findOne({
    email: email
  }, function (err, user) {
    if (err || !user) {
      return res.status(400).json({
        error: "User with that email does not exist. Please signup"
      });
    } // if user is found make sure the email and password match
    // create authenticate method in user model


    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and password dont match"
      });
    } // generate a signed token with user id and secret


    var token = jwt.sign({
      _id: user._id
    }, process.env.JWT_SECRET); // persist the token as 't' in cookie with expiry date

    res.cookie("t", token, {
      expire: new Date() + 9999
    }); // return response with user and token to frontend client

    var _id = user._id,
        name = user.name,
        email = user.email,
        role = user.role;
    return res.json({
      token: token,
      user: {
        _id: _id,
        email: email,
        name: name,
        role: role
      }
    });
  });
};

exports.signout = function (req, res) {
  res.clearCookie("t");
  res.json({
    message: "Signout success"
  });
};

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['RS256'],
  userProperty: "auth"
});

exports.isAuth = function (req, res, next) {
  var user = req.profile && req.auth && req.profile._id == req.auth._id;

  if (!user) {
    return res.status(403).json({
      error: "Access denied"
    });
  }

  next();
};

exports.isAdmin = function (req, res, next) {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "Admin resourse! Access denied"
    });
  }

  next();
};