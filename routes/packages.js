const express = require("express");
const router = express.Router();

// ? Import user auth
/////////////////////

// ? import controllers
// //////////////////////
const PackageController = require("../controllers/packages");

// ? import validators
// ////////////////////

// ? set routers
// //////////////
router.get("/", PackageController.getPackages);
router.get("/:id", PackageController.getPackageById);
router.put("/:id", PackageController.updatePackage);
router.post("/", PackageController.createPackage);
router.delete("/:id", PackageController.deletePackage);

// ? export router
//////////////////
module.exports = router;
//
