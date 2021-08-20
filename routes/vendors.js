// Amri's Code
const express = require("express");

// import auth
const { register, login } = require("../middlewares/auth/vendor");

// vendor validator
const { vendor } = require("../middlewares/auth/vendor");
const { getMe } = require("../controllers/auth");
const { vendorValidator } = require("../middlewares/validators/vendors");

// import validator
const {
  registerValidator,
  logInValidator,
} = require("../middlewares/validators/auth");
// Import controller
const {
  getVendors,
  getVendorById,
  updateVendor,
  deleteVendor,
} = require("../controllers/vendors");

// Import controller
const { getToken } = require("../controllers/auth");

// Make router
const router = express.Router();

// Make some routes
// Make routes
router.post("/register", registerValidator, register, getToken);
router.post("/login", logInValidator, login, getToken);
router.get("/", getVendors);
router.get("/getMe", vendor, getMe);
router.put("/edit", vendorValidator, vendor, updateVendor);
// router.delete("/getMe", vendorValidator, deleteVendor, getMe);

// Exports
module.exports = router;
