// Amri's code
const express = require("express");

// Import auth
const { register, login, logout } = require("../middlewares/auth/vendor");

// Import validator
const {
  registerValidator,
  logInValidator,
} = require("../middlewares/validators/auth");

// Import controller
const { getToken } = require("../controllers/auth");

// Make router
const router = express.Router();

// Make routes
router.post("/register", registerValidator, register, getToken);
router.post("/login", logInValidator, login, getToken);

// Exports
module.exports = router;
