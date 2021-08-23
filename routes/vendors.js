// Amri's Code
const express = require("express");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage: storage });

// import auth
const { register, login, vendor } = require("../middlewares/auth/vendor");

// vendor validator from vendor
const { vendorValidator } = require("../middlewares/validators/vendors");
const { queryVendorValidator } = require("../middlewares/validators/vendors");

// import validator from Auth
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
  getVendorsByPage,
} = require("../controllers/vendors");

// Import controller from auth
const { getToken, getMe } = require("../controllers/auth");
const vendors = require("../controllers/vendors");

// Make router
const router = express.Router();

// Make some routes
// Make routes
router.post("/register", registerValidator, register, getToken);
router.post("/login", logInValidator, login, getToken);
router.get("/", queryVendorValidator, getVendors);
// router.get("/page", queryVendorValidator, vendor, getVendorsByPage);
router.get("/getMe", vendor, getMe);
router.get("/:id", getVendorById);
router.put(
  "/edit",
  upload.fields([
    {
      name: "vendor_header",
    },
    {
      name: "vendor_avatar",
    },
  ]),
  vendorValidator,
  vendor,
  updateVendor
);

// router.delete("/getMe", vendorValidator, deleteVendor, getMe);

// Exports
module.exports = router;
