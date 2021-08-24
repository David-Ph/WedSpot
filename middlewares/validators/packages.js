const { Package, vendor } = require("../../models");
const validator = require("validator");
const {
  locations,
  venueServices,
  organizerServices,
} = require("../../config/services");
const { promisify } = require("util");

function hasDuplicates(array) {
  // will return true if there's a duplicate element in an array
  return new Set(array).size !== array.length;
}

exports.queryPackageValidator = async (req, res, next) => {
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

exports.packageValidator = async (req, res, next) => {
  try {
    const errorMessages = [];

    if (
      req.body.package_location &&
      !locations.includes(req.body.package_location.toLowerCase())
    ) {
      errorMessages.push("Invalid location");
    }

    if (req.body.package_price && !validator.isInt(req.body.package_price)) {
      errorMessages.push("Invalid package_price format! Please insert numeric");
    }

    // check if package_capacity is valid format
    if (req.body.package_capacity) {
      const array = req.body.package_capacity.split("-");

      if (array.length !== 2 || isNaN(array[0]) || isNaN(array[1])) {
        errorMessages.push(
          "Invalid package_capacity format. Example: '50-250'"
        );
      }

      req.body.package_min_capacity = array[0];
      req.body.package_max_capacity = array[1];
    }

    // check for package_services validity
    if (req.body.packages_services && req.body.package_services.length > 0) {
      // if package_services is not an array, make it an array
      if (typeof req.body.package_services === "string") {
        req.body.package_services = [req.body.package_services];
      }

      req.body.package_services.forEach((service) => {
        if (req.body.package_type?.toLowerCase() == "venue") {
          if (!venueServices.includes(service)) {
            errorMessages.push(`${service} is invalid venue service!`);
          }
        } else {
          if (!organizerServices.includes(service)) {
            errorMessages.push(`${service} is invalid organizer service!`);
          }
        }
      });
    }

    //  check for duplicates in req.body.package_services
    if (
      req.body.packages_services &&
      req.body.package_services.length > 0 &&
      hasDuplicates(req.body.package_services)
    ) {
      errorMessages.push(
        "Please do not insert a single service more than once!"
      );
    }

    if (req.files.length > 0) {
      req.body.package_album = [];
      req.files.forEach((photo) => {
        if (!photo.mimetype.startsWith("image") || photo.size > 2000000) {
          errorMessages.push("File must be an image and less than 2MB");
        } else {
          req.body.package_album.push(photo.path);
        }
      });
    }

    // set package_type as the same one with
    // the vendor creating the package
    const currentVendor = await vendor.findOne({ _id: req.vendor.user });
    req.body.package_vendor_id = currentVendor._id;
    req.body.package_type = currentVendor.vendor_type;

    if (errorMessages.length > 0) {
      return next({ statusCode: 400, messages: errorMessages });
    }

    next();
  } catch (error) {
    next(error);
  }
};
