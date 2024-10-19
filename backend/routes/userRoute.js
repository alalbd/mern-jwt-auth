// External imports
const express = require("express");

// Internal imports
const { signUp, login } = require("../controllers/userController");
const {
  userValidation,
  userValidationMsg,
} = require("../middlewares/user/userValidation");
const {
  userLoginValidation,
  userLoginValidationMsg,
} = require("../middlewares/login/userLoginValidation");

const router = express.Router();

// Register User
router.post("/register", userValidation, userValidationMsg, signUp);

// User Login
router.post("/login", userLoginValidation, userLoginValidationMsg, login);

// export
module.exports = router;
