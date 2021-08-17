const { Package } = require("../../models");
const validator = require("validator");
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

    if (req.body.releaseDate && !validator.isDate(req.body.releaseDate)) {
      errorMessages.push(
        "Release date not valid! Please enter a date in YYYY-MM-DD format"
      );
    }

    if (req.body.budget && !validator.isInt(req.body.budget)) {
      errorMessages.push("Budget not valid! Please enter a number");
    }

    if (req.body.trailer && !validator.isURL(req.body.trailer)) {
      errorMessages.push("Please insert valid url!");
    }
    //  check for duplicates in req.body.categories
    if (req.body.categories.length > 0 && hasDuplicates(req.body.categories)) {
      errorMessages.push(
        "Please do not insert a single category more than once!"
      );
    }
    // check if req.body.categories has invalid category
    if (
      req.body.categories.length > 0 ||
      !validator.isEmpty(req.body.categories)
    ) {
      req.body.categories.forEach((tag) => {
        if (!categories.includes(tag)) {
          errorMessages.push(`${tag} is not a valid category!`);
        }
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
