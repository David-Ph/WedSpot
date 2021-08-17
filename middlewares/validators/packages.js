const { Package } = require("../../models");
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

    if (
      req.body.package_price &&
      !validator.isNumeric(req.body.package_price)
    ) {
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
    }

    // check for package_services validity
    if (req.body.package_services.length > 0) {
      if (req.body.package_type.toLowerCase() == "venue") {
        venueServices.forEach((service) => {
          if (!req.body.package_services.includes(service)) {
            errorMessages.push(`${service} is not a valid service!`);
          }
        });
      } else {
        organizerServices.forEach((service) => {
          if (!req.body.package_services.includes(service)) {
            errorMessages.push(`${service} is not a valid service!`);
          }
        });
      }
    }

    //  check for duplicates in req.body.package_services
    if (
      req.body.package_services.length > 0 &&
      hasDuplicates(req.body.package_services)
    ) {
      errorMessages.push(
        "Please do not insert a single service more than once!"
      );
    }

    if (req.files) {
      req.files.package_album?.forEach((photo) => {
        if (photo.mimetype.startsWith("image") || photo.size > 2000000) {
          errorMessages.push("File must be an image and less than 2MB");
        }
        const move = promisify(photo.mv);
        const newFileName = new Date().getTime() + "_" + photo.name;
        await move(`./public/images/packages/albums/${newFileName}`);

        req.body.package_album.push(newFileName);
      });
    }

    if (errorMessages.length > 0) {
      return next({ statusCode: 400, messages: errorMessages });
    }

    next();
  } catch (error) {
    next(error);
  }
};
