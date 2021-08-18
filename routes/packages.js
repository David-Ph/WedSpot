const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage: storage });

// ? Import user auth
/////////////////////

// ? import controllers
// //////////////////////
const PackageController = require("../controllers/packages");

// ? import validators
// ////////////////////
const {
  packageValidator,
  queryPackageValidator,
} = require("../middlewares/validators/packages");

// ? set routers
// //////////////
router.get("/", queryPackageValidator, PackageController.getPackages);
router.get("/count", PackageController.getPackagesCount);
router.get("/:id", PackageController.getPackageById);
router.put(
  "/:id",
  upload.array("package_album"),
  packageValidator,
  PackageController.updatePackage
);
router.post(
  "/",
  upload.array("package_album"),
  packageValidator,
  PackageController.createPackage
);
router.delete("/:id", PackageController.deletePackage);

// ? export router
//////////////////
module.exports = router;
