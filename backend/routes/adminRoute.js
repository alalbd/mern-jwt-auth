// External imports
const express = require("express");

// Internal imports
const { dashboard, postlist } = require("../controllers/adminController");
const checkLogin = require("../middlewares/common/checkLogin");

const router = express.Router();

// Auth Check
router.get("/dashboard/auth-check", checkLogin, dashboard);

// Post List
router.get("/posts", checkLogin, postlist);

// export
module.exports = router;
