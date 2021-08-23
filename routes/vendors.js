// Amri's Code
const express = require("express");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage: storage });

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
const { queryVendorValidator } = require("../middlewares/validators/vendors");

// Import controller
const {
  getVendors,
  getVendorById,
  updateVendor,
  deleteVendor,
  getVendorsByPage,
} = require("../controllers/vendors");

// Import controller
const { getToken } = require("../controllers/auth");
const vendors = require("../controllers/vendors");

// Make router
const router = express.Router();

// Make some routes
// Make routes
router.post("/register", registerValidator, register, getToken);
router.post("/login", logInValidator, login, getToken);
router.get("/", queryVendorValidator, vendor, getVendors);
router.get("/page", queryVendorValidator, vendor, getVendorsByPage);
router.get("/getMe", vendor, getMe);
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
router.get("/:id", vendor, getVendorById);
// router.delete("/getMe", vendorValidator, deleteVendor, getMe);

// Exports
module.exports = router;
