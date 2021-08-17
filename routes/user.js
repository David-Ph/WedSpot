const express = require("express");

// import auth
const { signup, signin } = require("../middlewares/auth/user");

// admin or user validator
const { user } = require("../middlewares/auth/user");
const { userValidator } = require("../middlewares/validators/user");

// import validator
const {
  signUpValidator,
  signInValidator,
} = require("../middlewares/validators/auth");

const { updateUser } = require("../controllers/user");

const { getToken, getMe } = require("../controllers/auth");

// make router
const router = express.Router();

// router
router.post("/signup", signUpValidator, signup, getToken);
router.post("/signin", signInValidator, signin, getToken);
router.get("/getMe", user, getMe);
router.put("/edit", userValidator, updateUser);

// exports
module.exports = router;
