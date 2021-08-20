// Amri's Code
const { vendor } = require("../../models");
const validator = require("validator");
const mongoose = require("mongoose");
const { locations } = require("../../config/types");

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

    // if (req.body.vendor_name && !validator.isEmpty(req.body.vendor_name)) {
    //   errorMessages.push("Vendor's name should not be empty");
    // }

    if (
      req.body.vendor_email_info &&
      !validator.isEmail(req.body.vendor_email_info)
    ) {
      errorMessages.push("Email account should not be empty");
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
    }

    // check if package_capacity is valid format
    if (req.body.vendor_capacity) {
      const array = req.body.vendor_capacity.split("-");

      if (array.length !== 2 || isNaN(array[0]) || isNaN(array[1])) {
        errorMessages.push("Invalid vendor_capacity format. Example: '50-250'");
      }
    }

    // if (req.body.vendor_types) {
    //   if (!validator.isValid(req.body.vendor_types)) {
    //     errorMessages.push("Vendor type is not valid");
    //   }
    // }
    //checking limited photo size
    if (req.files) {
      if (
        !req.files.photo.mimetype.startsWith("image") ||
        req.files.photo.size > 2000000
      ) {
        errorMessages.push("File must be an image and less than 2MB");
      }
      const move = promisify(req.files.photo.mv);
      const newFileName = new Date().getTime() + "_" + req.files.photo.name;
      await move(`./public/images/vendors/${newFileName}`);
      req.body.photo = newFileName;
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
