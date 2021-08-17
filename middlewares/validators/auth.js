const validator = require("validator");

exports.signUpValidator = async (req, res, next) => {
  try {
    const errorMessages = [];

    if (validator.isEmpty(req.body.fullname)) {
      errorMessages.push("Fullname can not be empty");
    }

    if (!validator.isEmail(req.body.email)) {
      errorMessages.push("email is not valid");
    }

    if (!validator.isStrongPassword(req.body.password)) {
      errorMessages.push("password is not strong enough");
    }

    if (errorMessages.length > 0) {
      return next({ messages: errorMessages, statusCode: 400 });
    }

    next();
  } catch (error) {
    next(error);
  }
};

exports.signInValidator = async (req, res, next) => {
  try {
    const errorMessages = [];

    if (!validator.isEmail(req.body.email)) {
      errorMessages.push("email is not valid");
    }

    if (errorMessages.length > 0) {
      return next({ messages: errorMessages, statusCode: 400 });
    }

    next();
  } catch (error) {
    next(error);
  }
};
