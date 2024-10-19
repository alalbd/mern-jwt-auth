// External import
const createError = require("http-errors");

// 404 Error Handle
const nonFoundHandle = (req, res, next) => {
  next(createError(404, "Your requested content was not found!"));
};

// Common Error Handle
const commonErrorHandle = (err, req, res, next) => {
  const message = process.env.NODE_ENV === "development" ? err : err.message;
  res.status(500).json({
    errors: {
      common: {
        msg: message,
      },
    },
  });
};

// Export
module.exports = {
  nonFoundHandle,
  commonErrorHandle,
};
