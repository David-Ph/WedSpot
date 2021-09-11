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
  googleRedirectMobile,
  googleSignInMobile,
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
  removeToken,
  storeToken,
} = require("../controllers/vendors");

// Import controller from auth
const {
  getToken,
  getMe,
  getTokenOAuth,
  getTokenOAuthMobile,
} = require("../controllers/auth");
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

router.put("/logout", vendor, removeToken); // to delete messaging token
router.put("/storetoken", vendor, storeToken); // to edit messaging token that recieved

// * For Front End google oAuth
router.get("/auth/google", googleSignIn);
router.get(
  "/auth/google/redirect",
  googleRedirect,
  addVendorRedirect,
  getTokenOAuth
);
router.get("/failed", (req, res) =>
  res.status(401).json({ message: "Login failed" })
);

// * For Mobile google oAuth
router.get("/auth/google/mobile", googleSignInMobile);
router.get(
  "/auth/google/mobile/redirect",
  googleRedirectMobile,
  addVendorRedirect,
  getTokenOAuthMobile
);
router.get("/failed/mobile", (req, res) =>
  res.status(401).json({ message: "Login failed" })
);

// Exports
module.exports = router;
