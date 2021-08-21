const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage: storage });

// ? Import user auth
/////////////////////
const { vendor } = require("../middlewares/auth/vendor");
const { user } = require("../middlewares/auth/user");

// ? import controllers
// //////////////////////

// ? import validators
// ////////////////////

// ? set routers
// //////////////

// ? export router
//////////////////
module.exports = router;
//
