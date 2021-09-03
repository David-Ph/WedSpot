// Amri's Code
const express = require("express");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage: storage });

// import auth
const {
  register,
  login,
  vendor,
  googleSignIn,
  googleRedirect,
  addVendorRedirect,
} = require("../middlewares/auth/vendor");

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
  getVendorsByType,
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
router.get("/:id", getVendorById);
router.get("/auth/google", googleSignIn);
router.get(
  "/auth/google/redirect",
  googleRedirect,
  addVendorRedirect,
  getToken
);
router.get("/failed", (req, res) =>
  res.status(401).json({ message: "Login failed" })
);

// router.delete("/getMe", vendorValidator, deleteVendor, getMe);

// Exports
module.exports = router;
