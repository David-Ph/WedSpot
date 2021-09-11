const express = require("express");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage: storage });
const passport = require("passport");

// import auth
const { register, login } = require("../middlewares/auth/user");

// admin or user validator
const {
  user,
  googleRedirect,
  googleSignIn,
  googleSignInMobile,
  googleRedirectMobile,
} = require("../middlewares/auth/user");
const { user_validator } = require("../middlewares/validators/user");

// import validator
const {
  register_validator,
  login_validator,
} = require("../middlewares/validators/user_auth.js");

const {
  update_user,
  deleted_user_token,
  received_user_token,
} = require("../controllers/user");

const {
  get_token,
  get_me,
  get_token_oauth,
  get_token_oauth_mobile,
} = require("../controllers/user_auth.js");

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
router.put("/storetoken", user, received_user_token);
router.put("/logout", user, deleted_user_token);

// * For google oAuth Front End
router.get("/auth/google", googleSignIn);
router.get("/auth/google/redirect", googleRedirect, get_token_oauth);
router.get("/failed", (req, res) =>
  res.status(401).json({ message: "Login failed" })
);

// * For google oAuth Mobile
router.get("/auth/google/mobile", googleSignInMobile);
router.get(
  "/auth/google/mobile/redirect",
  googleRedirectMobile,
  get_token_oauth_mobile
);
router.get("/failed/mobile", (req, res) =>
  res.status(401).json({ message: "Login failed" })
);

// exports
module.exports = router;
