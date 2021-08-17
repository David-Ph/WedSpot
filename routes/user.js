const express = require("express");

// import auth
const { register, login } = require("../middlewares/auth/user");

// admin or user validator
const { user } = require("../middlewares/auth/user");
const { user_validator } = require("../middlewares/validators/user");

// import validator
const {
  register_validator,
  login_validator,
} = require("../middlewares/validators/auth");

const { updateUser } = require("../controllers/user");

const { get_token, get_me } = require("../controllers/auth");

// make router
const router = express.Router();

// router
router.post("/register", register_validator, register, get_token);
router.post("/login", login_validator, login, get_token);
router.get("/getMe", user, get_me);
router.put("/edit", user_validator, updateUser);

// exports
module.exports = router;
