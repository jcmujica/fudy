const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const expressValidator = require("express-validator");
require("dotenv").config();

// Routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const ingredientRoutes = require("./routes/ingredient");
const recipeRoutes = require("./routes/recipe");
// const productRoutes = require("./routes/product");
// const braintreeRoutes = require("./routes/braintree");
// const orderRoutes = require("./routes/order");

// App
const app = express();

// DB
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log("DB Connected"));

// Middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

// Route Middleware
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", ingredientRoutes);
app.use("/api", recipeRoutes);
// app.use("/api", braintreeRoutes);
// app.use("/api", orderRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
