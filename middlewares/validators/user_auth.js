const validator = require("validator");

exports.register_validator = async (req, res, next) => {
  try {
    const error_messages = [];

    if (
      req.body.user_fullname &&
      !validator.isAlphanumeric(req.body.user_fullname, "en-US", {
        ignore: "._- ",
      })
    ) {
      error_messages.push("Name can only contains letters and numbers");
    }

    if (!validator.isEmail(req.body.user_email)) {
      error_messages.push("email is not valid");
    }

    if (!validator.isStrongPassword(req.body.user_password)) {
      error_messages.push("password is not strong enough");
    }

    if (error_messages.length > 0) {
      return next({ messages: error_messages, statusCode: 400 });
    }

    next();
  } catch (error) {
    next(error);
  }
};

exports.login_validator = async (req, res, next) => {
  try {
    const error_messages = [];

    if (!validator.isEmail(req.body.user_email)) {
      error_messages.push("email is not valid");
    }

    if (error_messages.length > 0) {
      return next({ messages: error_messages, statusCode: 400 });
    }

    next();
  } catch (error) {
    next(error);
  }
};
