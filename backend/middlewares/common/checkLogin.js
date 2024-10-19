// External imports
const jwt = require("jsonwebtoken");

const checkLogin = (req, res, next) => {
  try {
    const auth = req.headers["authorization"];
    const authToken = auth.split("Bearer ");
    const isValidToken = authToken[1];

    // if has [ auth ]
    if (isValidToken) {
      const jwtSecret = process.env.JWT_SECRET;
      const decoded = jwt.verify(isValidToken, jwtSecret);

      req.user = decoded;
      next();
    } else {
      res.status(403).json({
        message: "Unauthorized, Token was required!",
        success: false,
      });
    }
  } catch (err) {
    res.status(403).json({
      message: "Unauthorized, Token was expired! Please try again!",
      success: false,
    });
  }
};

// Export
module.exports = checkLogin;
