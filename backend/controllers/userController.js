// external imports
const bcrypt = require("bcrypt");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");

// Internal imports
const User = require("../models/userSchema");

// register controller
const signUp = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Hash Password
    const hashPassword = await bcrypt.hash(password, 10);
    // User Object
    const user = new User({
      name,
      email,
      password: hashPassword,
    });
    await user.save();
    res.status(201).json({
      message: "User successfully added!",
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: "Interval server error!",
      err: err.message,
      success: false,
    });
  }
};

// User login
const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user && user._id) {
      const { _id, name, email, password } = user;

      // Password compare
      const isValidPassword = await bcrypt.compare(req.body.password, password);

      if (isValidPassword) {
        const userObject = {
          _id,
          name,
          email,
        };

        // Token generate
        const jwtSecret = process.env.JWT_SECRET;
        const jwtExpire = process.env.EXPIRE;
        const token = jwt.sign(userObject, jwtSecret, {
          expiresIn: jwtExpire,
        });

        // response
        res.status(200).json({
          message: "User successfully logged!",
          success: true,
          token,
          name,
          email,
        });
      } else {
        throw createError("Login Faild! Please try again!");
      }
    } else {
      throw createError("Login Faild! Please try again!");
    }
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error!",
      success: false,
    });
  }
};

// export
module.exports = {
  signUp,
  login,
};
