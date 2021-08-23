const express = require("express");
const router = express.Router();

// ? Import controllers
// //////////////////////
const ConfigController = require("../controllers/config");

// ? set routers
// //////////////
router.get("/venue", ConfigController.getVenueServices);
router.get("/organizer", ConfigController.getOrganizerServices);
router.get("/locations", ConfigController.getLocations);

// ? export router
//////////////////
module.exports = router;
//
