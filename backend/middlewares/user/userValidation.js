// External imports
const { check, validationResult } = require("express-validator");
const createError = require("http-errors");

// Internal imports
const User = require("../../models/userSchema");

// user requiest validation
const userValidation = [
  check("name")
    .isString()
    .isLength({ min: 4 })
    .withMessage("User name is required! and Minimum 4 letter word")
    .trim(),
  check("email")
    .isString()
    .isEmail()
    .withMessage("Valid email address required!")
    .trim()
    .custom(async (value) => {
      try {
        const user = await User.findOne({ email: value });
        if (user) {
          throw createError(409, "Email address already registered!");
        }
      } catch (err) {
        throw createError(500, err.message);
      }
    }),
  check("password")
    .isString()
    .isStrongPassword()
    .withMessage(
      "Password must be minimum Length: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1"
    ),
];

// user validation error message
const userValidationMsg = (req, res, next) => {
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
  userValidation,
  userValidationMsg,
};
