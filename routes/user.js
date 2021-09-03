const express = require("express");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage: storage });
const passport = require("passport");

// import auth
const { register, login } = require("../middlewares/auth/user");

// admin or user validator
const { user } = require("../middlewares/auth/user");
const { user_validator } = require("../middlewares/validators/user");

// import validator
const {
  register_validator,
  login_validator,
} = require("../middlewares/validators/user_auth.js");

const { update_user } = require("../controllers/user");

const { get_token, get_me } = require("../controllers/user_auth.js");

// make router
const router = express.Router();

// router
router.post("/register", register_validator, register, get_token);
router.post("/login", login_validator, login, get_token);
router.get("/getprofil", user, get_me);
router.put(
  "/edit",
  upload.single("user_avatar"),
  user,
  user_validator,
  update_user
);
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email", "openid"] })
);

router.get(
  "/auth/google/redirect",
  passport.authenticate("google", { failureRedirect: "/login" }),
  get_token
);

// exports
module.exports = router;
