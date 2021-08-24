const { Package, vendor, User, Request, Quotation } = require("../../models");
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

exports.createQuotationValidator = async (req, res, next) => {
  try {
    const errorMessages = [];

    // get vendor data based on currently logged in vendor
    const getVendor = await vendor.findOne({ _id: req.vendor.user });
    req.body.quotation_vendor_id = getVendor._id;

    // // get package and vendor data based on req.body.request_package_id
    const getRequest = await Request.findOne({
      _id: req.body.quotation_request_id,
    });
    req.body.quotation_user_id = getRequest.request_user_id;

    if (!getRequest) {
      errorMessages.push("Package not found!");
    }

    if (req.file) {
      req.body.quotation_file = req.file.path;
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

    const getQuotation = await Quotation.findOne({ _id: req.params.id });

    if (!getQuotation) {
      return next({ statusCode: 404, messages: "Request not found" });
    }

    if (req.user.user != getQuotation.quotation_user_id) {
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