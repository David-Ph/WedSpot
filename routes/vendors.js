// Amri's Code
const express = require("express");
// const multer = require("multer");
// const { storage } = require("../cloudinary");
// const upload = multer({ storage });

// Import auth
const { sameVendor } = require("../middlewares/auth/vendor");

// Import validator
const {
  createOrUpdateVendorValidator,
  getDetailValidator,
} = require("../middlewares/validators/vendors");

// Import controller
const {
  getVendors,
  getVendorById,
  createVendor,
  updateVendor,
  deleteVendor,
} = require("../controllers/vendors");

// Make router
const router = express.Router();

// Make some routes
router.post("/", createOrUpdateVendorValidator, createVendor);
router.get("/", getVendors);

router.get("/:id", getDetailValidator, getVendorById);
router.put(
  "/:id",
  getDetailValidator,
  createOrUpdateVendorValidator,
  updateVendor
);
router.delete("/:id", getDetailValidator, deleteVendor);

// Exports
module.exports = router;
