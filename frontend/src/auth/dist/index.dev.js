"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAuthenticated = exports.signout = exports.authenticate = exports.signin = exports.signup = void 0;

var _config = require("../config");

var signup = function signup(user) {
  return fetch("".concat(_config.API, "/signup"), {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  }).then(function (response) {
    return response.json();
  })["catch"](function (err) {
    console.log(err);
  });
};

exports.signup = signup;

var signin = function signin(user) {
  return fetch("".concat(_config.API, "/signin"), {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  }).then(function (response) {
    console.log(response);
    return response.json();
  })["catch"](function (err) {
    console.log(err);
  });
};

exports.signin = signin;

var authenticate = function authenticate(data, next) {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

exports.authenticate = authenticate;

var signout = function signout(next) {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    next();
    return fetch("".concat(_config.API, "/signout"), {
      method: "GET"
    }).then(function (response) {
      console.log("signout", response);
    })["catch"](function (err) {
      return console.log(err);
    });
  }
};

exports.signout = signout;

var isAuthenticated = function isAuthenticated() {
  if (typeof window == "undefined") {
    return false;
  }

  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};

exports.isAuthenticated = isAuthenticated;