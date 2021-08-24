const validator = require("validator");

exports.registerValidator = async (req, res, next) => {
  try {
    const errorMessages = [];

    if (req.body.vendor_name === "") {
      errorMessages.push("name cannot be empty");
    }

    if (req.body.vendor_email && !validator.isEmail(req.body.vendor_email)) {
      errorMessages.push("email is not valid");
    }

    if (
      req.body.vendor_password &&
      !validator.isStrongPassword(req.body.vendor_password)
    ) {
      errorMessages.push("password is not strong");
    }

    if (errorMessages.length) {
      return next({ messages: errorMessages, statusCode: 400 });
    }

    next();
  } catch (error) {
    next(error);
  }
};

exports.logInValidator = async (req, res, next) => {
  try {
    const errorMessages = [];

    if (req.body.vendor_email && !validator.isEmail(req.body.vendor_email)) {
      errorMessages.push("email is not valid");
    }

    if (
      req.body.vendor_password &&
      !validator.isStrongPassword(req.body.vendor_password)
    ) {
      errorMessages.push("Wrong password");
    }

    if (errorMessages.length > 0) {
      return next({ messages: errorMessages, statusCode: 400 });
    }

    next();
  } catch (error) {
    next(error);
  }
};
