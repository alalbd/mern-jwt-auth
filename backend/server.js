// External imports
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Internal imports
const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute");
const {
  nonFoundHandle,
  commonErrorHandle,
} = require("./middlewares/common/errorHandle");

// Env Config
dotenv.config();

// Database
const dbURL = process.env.MONGOOSE;
mongoose
  .connect(dbURL)
  .then(() => {
    console.log("Mongoose connect successfully!");
  })
  .catch((err) => {
    console.log(err);
  });

// Basic
const app = express();

// Cors
app.use(cors());
app.use(express.json());

// Case sensitive routing
app.enable("case sensitive routing");

// Cookie
const cookieSecret = process.env.COOKIE_SECRET;
app.use(cookieParser(cookieSecret));

// Route
app.use("/user/auth", userRoute);
app.use("/admin", adminRoute);

// 404 erorr handle
app.use(nonFoundHandle);

// All Common error handle
app.use(commonErrorHandle);

// Server Running
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on ${port} port`);
});
