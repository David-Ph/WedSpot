const { Package, vendor, User, Request } = require("../../models");
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

exports.queryRequestValidator = async (req, res, next) => {
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

exports.createRequestValidator = async (req, res, next) => {
  try {
    const errorMessages = [];

    // get user data based on currently logged in user
    const getUser = await User.findOne({ _id: req.user.user });
    req.body.request_user_id = getUser._id;

    // get package and vendor data based on req.body.request_package_id
    const getPackage = await Package.findOne({
      _id: req.body.request_package_id,
    });
    req.body.request_vendor_id = getPackage.package_vendor_id;

    if (!getPackage) {
      errorMessages.push("Package not found!");
    }

    if (errorMessages.length > 0) {
      return next({ statusCode: 400, messages: errorMessages });
    }

    next();
  } catch (error) {
    next(error);
  }
};

exports.updateRequestValidator = async (req, res, next) => {
  try {
    const errorMessages = [];

    const getRequest = await Request.findOne({ _id: req.params.id });

    if (!getRequest) {
      return next({ statusCode: 404, messages: "Request not found" });
    }

    console.log(req.vendor.user);
    console.log(getRequest);

    if (req.vendor.user != getRequest.request_vendor_id) {
      return next({ statusCode: 401, messages: "Forbidden acccess" });
    }

    if (errorMessages.length > 0) {
      return next({ statusCode: 400, messages: errorMessages });
    }

    next();
  } catch (error) {
    next(error);
  }
};
