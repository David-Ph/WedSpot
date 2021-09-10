const express = require("express");
const router = express.Router();

// ? import user auth
// //////////////////
const { user } = require("../middlewares/auth/user");
const { vendor } = require("../middlewares/auth/vendor");

// ? import controllers
// ////////////////////
const NotificationController = require("../controllers/notifications");

// ? Import validators
// ///////////////////
const {
  queryNotificationValidator,
  checkUserValidator,
  checkVendorValidator,
} = require("../middlewares/validators/notifications");

// ? set routers
// /////////////
router.get(
  "/user",
  user,
  queryNotificationValidator,
  NotificationController.getNotifUser
);
router.put(
  "/user/:id",
  user,
  checkUserValidator,
  NotificationController.updateNotificationUser
);

router.get(
  "/vendor",
  vendor,
  queryNotificationValidator,
  NotificationController.getNotifVendor
);
router.put(
  "/vendor/:id",
  vendor,
  checkVendorValidator,
  NotificationController.updateNotificationVendor
);

// ? exports router
// ////////////////
module.exports = router;
