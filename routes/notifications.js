const express = require("express");
const router = express.Router();

// ? import user auth
// //////////////////
const { user } = require("../middlewares/auth/user");
const { vendor } = require("../middlewares/auth/vendor");

// ? import controllers
// ////////////////////

// ? import validators
// ///////////////////

// ? set routers
// /////////////
router.get("/user"); // getNotificationByUser
router.get("/user/:id"); // update notification status for user

router.put("/vendor"); // getNotificationByVendor
router.put("/vendor/:id"); // update notification status for vendor

// ? exports router
// ////////////////
module.exports = router;
