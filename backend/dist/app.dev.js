"use strict";

var express = require("express");

var mongoose = require("mongoose");

var morgan = require("morgan");

var bodyParser = require("body-parser");

var cookieParser = require("cookie-parser");

var cors = require("cors");

var expressValidator = require("express-validator");

require("dotenv").config(); // Routes


var authRoutes = require("./routes/auth");

var userRoutes = require("./routes/user"); // const categoryRoutes = require("./routes/category");
// const productRoutes = require("./routes/product");
// const braintreeRoutes = require("./routes/braintree");
// const orderRoutes = require("./routes/order");
// App


var app = express(); // DB

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useCreateIndex: true
}).then(function () {
  return console.log("DB Connected");
}); // Middleware

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors()); // Route Middleware

app.use("/api", authRoutes);
app.use("/api", userRoutes); // app.use("/api", categoryRoutes);
// app.use("/api", productRoutes);
// app.use("/api", braintreeRoutes);
// app.use("/api", orderRoutes);

var port = process.env.PORT || 8000;
app.listen(port, function () {
  console.log("Server is running on port ".concat(port));
});