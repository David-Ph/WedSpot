const express = require("express");
const router = express.Router();

// ? Import user auth
/////////////////////
const { vendor } = require("../middlewares/auth/vendor");
const { user } = require("../middlewares/auth/user");

// ? import controllers
// //////////////////////
const RequestController = require("../controllers/requests");

// ? import validators
// ////////////////////
const {
  createRequestValidator,
  updateRequestValidator,
  queryRequestValidator,
} = require("../middlewares/validators/requests");

// ? set routers
// //////////////
router.get(
  "/user",
  user,
  queryRequestValidator,
  RequestController.getRequestsByUser
);
router.get(
  "/vendor",
  vendor,
  queryRequestValidator,
  RequestController.getRequestsByVendor
);
router.get("/:id", RequestController.getRequestById);
router.post("/", user, createRequestValidator, RequestController.createRequest);

// ? export router
//////////////////
module.exports = router;
//
