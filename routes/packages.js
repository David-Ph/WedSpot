const express = require("express");
const router = express.Router();

// ? Import user auth
/////////////////////

// ? import controllers
// //////////////////////
const PackageController = require("../controllers/packages");

// ? import validators
// ////////////////////
const { packageValidator } = require("../middlewares/validators/packages");

// ? set routers
// //////////////
router.get("/", PackageController.getPackages);
router.get("/:id", PackageController.getPackageById);
router.put("/:id", packageValidator, PackageController.updatePackage);
router.post("/", packageValidator, PackageController.createPackage);
router.delete("/:id", PackageController.deletePackage);

// ? export router
//////////////////
module.exports = router;
