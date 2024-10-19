// External imports
const { check, validationResult } = require("express-validator");
const createError = require("http-errors");

// Internal imports
const User = require("../../models/userSchema");

// user requiest validation
const userLoginValidation = [
  check("email")
    .isString()
    .isEmail()
    .withMessage("Valid email address required!")
    .trim(),
  check("password")
    .isStrongPassword()
    .withMessage(
      "Password must be minimum Length: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1"
    ),
];

// user login validation error message
const userLoginValidationMsg = (req, res, next) => {
  const errors = validationResult(req);
  const mappedError = errors.mapped();

  if (Object.keys(mappedError).length === 0) {
    next();
  } else {
    res.json({
      errors: mappedError,
    });
  }
};

// export
module.exports = {
  userLoginValidation,
  userLoginValidationMsg,
};
