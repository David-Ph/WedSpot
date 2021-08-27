// Amri's Code
const { vendor, Package } = require("../../models");
const validator = require("validator");
const mongoose = require("mongoose");
const { locations } = require("../../config/types");

exports.queryVendorValidator = async (req, res, next) => {
  try {
    const errorMessages = [];

    if (req.query.limit) {
      if (!validator.isInt(req.query.limit)) {
        errorMessages.push("Please enter proper number for limit query");
      }
    }

    if (req.query.page) {
      if (!validator.isInt(req.query.page)) {
        errorMessages.push("Please enter proper number for page query");
      }
    }

    if (errorMessages.length > 0) {
      return next({ statusCode: 400, messages: errorMessages });
    }

    next();
  } catch (error) {
    next(error);
  }
};

exports.getDetailValidator = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return next({ message: "id is not valid", statusCode: 400 });
    }

    next();
  } catch (error) {
    /* istanbul ignore next */
    next(error);
  }
};

exports.vendorValidator = async (req, res, next) => {
  try {
    /* Validate the user input */
    const errorMessages = [];

    if (
      req.body.vendor_email_info &&
      !validator.isEmail(req.body.vendor_email_info)
    ) {
      errorMessages.push("Email account is not valid");
    }

    if (
      req.body.vendor_phone &&
      !validator.isMobilePhone(req.body.vendor_phone)
    ) {
      {
        errorMessages.push("Phone number is not valid");
      }
    }

    if (req.body.vendor_website && !validator.isURL(req.body.vendor_website)) {
      {
        errorMessages.push("Website address is not valid");
      }
    }

    if (
      req.body.vendor_facebook &&
      !validator.isURL(req.body.vendor_facebook)
    ) {
      errorMessages.push(
        "Facebook account is not valid, Example: 'www.facebook.com/vendorAccount'"
      );
    }

    if (req.body.vendor_twitter && !validator.isURL(req.body.vendor_twitter)) {
      errorMessages.push(
        "Twitter account is not valid, Example: 'www.twitter.com/vendorAccount'"
      );
    }

    if (
      req.body.vendor_instagram &&
      !validator.isURL(req.body.vendor_instagram)
    ) {
      errorMessages.push(
        "Instagram account is not valid, Example: 'www.instagram.com/vendorAccount'"
      );
    }

    if (
      req.body.vendor_location &&
      !locations.includes(req.body.vendor_location.toLowerCase())
    ) {
      errorMessages.push("Location is not valid");
    }

    if (req.body.vendor_price_range) {
      const array = req.body.vendor_price_range.split("-");

      if (array.length !== 2 || isNaN(array[0]) || isNaN(array[1])) {
        errorMessages.push(
          "Invalid price range format. Example: '25000000-75000000'"
        );
      }
      req.body.vendor_min_price = array[0];
      req.body.vendor_max_price = array[1];
    }
    // check if package_capacity is valid format
    if (req.body.vendor_capacity) {
      const array = req.body.vendor_capacity.split("-");

      if (array.length !== 2 || isNaN(array[0]) || isNaN(array[1])) {
        errorMessages.push("Invalid vendor_capacity format. Example: '50-250'");
      }
      req.body.vendor_min_capacity = array[0];
      req.body.vendor_max_capacity = array[1];
    }

    // if (req.body.vendor_types) {
    //   if (!validator.isValid(req.body.vendor_types)) {
    //     errorMessages.push("Vendor type is not valid");
    //   }
    // }
    //checking limited photo size
    if (req.files) {
      if (req.files.vendor_avatar) {
        if (
          !req.files.vendor_avatar[0].mimetype.startsWith("image") ||
          req.files.vendor_avatar[0].size > 3000000
        ) {
          errorMessages.push("File must be an image and less than 3MB");
        } else {
          req.body.vendor_avatar = req.files.vendor_avatar[0].path;
        }
      }
      if (req.files.vendor_header) {
        if (
          !req.files.vendor_header[0].mimetype.startsWith("image") ||
          req.files.vendor_header[0].size > 3000000
        ) {
          errorMessages.push("File must be an image and less than 3MB");
        } else {
          req.body.vendor_header = req.files.vendor_header[0].path;
        }
      }
    }

    if (errorMessages.length > 0) {
      return next({ messages: errorMessages, statusCode: 400 });
    }
    next();
  } catch (error) {
    /* istanbul ignore next */
    next(error);
  }
};

exports.checkVendorValidator = async (req, res, next) => {
  try {
    /* Validate the user input */
    const errorMessages = [];

    const packageToModify = await Package.findById({ _id: req.params.id });

    if (!packageToModify) {
      return next({ message: "Package Not Found", statusCode: 404 });
    }

    /* check if currently logged in user
    has same id as updatedReview's user_id */
    const currentUser = req.vendor.user;
    if (currentUser != packageToModify.package_vendor_id) {
      return next({ statusCode: 403, messages: "Forbidden" });
    }

    if (errorMessages.length > 0) {
      return next({ messages: errorMessages, statusCode: 400 });
    }

    next();
  } catch (error) {
    next(error);
  }
};
