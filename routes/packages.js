const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage: storage });

// ? Import user auth
/////////////////////
const { vendor } = require("../middlewares/auth/vendor");
const { visitorOrUser } = require("../middlewares/auth/user");

// ? import controllers
// //////////////////////
const PackageController = require("../controllers/packages");

// ? import validators
// ////////////////////
const {
  packageValidator,
  queryPackageValidator,
} = require("../middlewares/validators/packages");

const { checkVendorValidator } = require("../middlewares/validators/vendors");

// ? set routers
// //////////////
router.get("/", queryPackageValidator, PackageController.getPackages);
router.get(
  "/vendor",
  vendor,
  queryPackageValidator,
  PackageController.getPackages
);
router.get(
  "/view/:vendor_id",
  queryPackageValidator,
  PackageController.getPackagesByVendorId
);
router.get("/count", PackageController.getPackagesCount);
router.get("/archive", vendor, PackageController.getArchivedPackage);
router.get("/:id", visitorOrUser, PackageController.getPackageById);
router.put(
  "/:id",
  upload.array("package_album"),
  vendor,
  checkVendorValidator,
  packageValidator,
  PackageController.updatePackage
);
router.post(
  "/",
  upload.array("package_album"),
  vendor,
  packageValidator,
  PackageController.createPackage
);
router.delete(
  "/:id",
  vendor,
  checkVendorValidator,
  PackageController.deletePackage
);

// ? export router
//////////////////
module.exports = router;
//
