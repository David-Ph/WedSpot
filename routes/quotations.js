const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage: storage });

// ? Import user auth
/////////////////////
const { vendor } = require("../middlewares/auth/vendor");
const { user } = require("../middlewares/auth/user");

// ? import controllers
// //////////////////////
const QuotationController = require("../controllers/quotations");

// ? import validators
// ////////////////////
const {
  createQuotationValidator,
  updateRequestValidator,
  queryQuotationValidator,
} = require("../middlewares/validators/quotations");

// ? set routers
// //////////////
// router.get('/', QuotationController.getQuotations);
router.get(
  "/user",
  user,
  queryQuotationValidator,
  QuotationController.getQuotationByUser
);
router.get(
  "/vendor",
  vendor,
  queryQuotationValidator,
  QuotationController.getQuotationByVendor
);
router.get("/:id", QuotationController.getQuotationById);
router.post(
  "/",
  upload.single("quotation_file"),
  vendor,
  createQuotationValidator,
  QuotationController.createQuotation
);
router.put(
  "/:id",
  user,
  updateRequestValidator,
  QuotationController.updateQuotationStatus
);
// router.delete("/:id", QuotationController.deleteQuotation);

// ? export router
//////////////////
module.exports = router;
//
