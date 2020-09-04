"use strict";

var mongoose = require("mongoose");

var crypto = require("crypto");

var _require = require('uuid'),
    uuidv1 = _require.v1;

var userSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  lastName: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  hashed_password: {
    type: String,
    required: true
  },
  about: {
    type: String,
    trim: true
  },
  salt: String,
  role: {
    type: Number,
    "default": 0
  },
  history: {
    type: Array,
    "default": []
  }
}, {
  timestamps: true
}); // virtual field

userSchema.virtual("password").set(function (password) {
  this._password = password;
  this.salt = uuidv1();
  this.hashed_password = this.encryptPassword(password);
}).get(function () {
  return this._password;
});
userSchema.methods = {
  authenticate: function authenticate(plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },
  encryptPassword: function encryptPassword(password) {
    if (!password) return "";

    try {
      return crypto.createHmac("sha1", this.salt).update(password).digest("hex");
    } catch (err) {
      return "";
    }
  }
};
module.exports = mongoose.model("User", userSchema);