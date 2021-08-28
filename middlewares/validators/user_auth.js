const validator = require("validator");

exports.register_validator = async (req, res, next) => {
  try {
    const error_messages = [];

    if (validator.isEmpty(req.body.user_email)) {
      error_messages.push("Please input your email");
    }

    if (!validator.isEmail(req.body.user_email)) {
      error_messages.push("email is not valid");
    }

    if (validator.isEmpty(req.body.user_fullname)) {
      error_messages.push("Please input your fullname");
    }

    if (req.body.user_fullname.length < 3) {
      error_messages.push("Fullname characters minimal is 3");
    }

    if (
      !validator.isAlphanumeric(req.body.user_fullname, "en-US", {
        ignore: " ",
      })
    ) {
      error_messages.push("Fullname can only contains letters and numbers");
    }

    if (validator.isEmpty(req.body.user_password)) {
      error_messages.push("Please input your password");
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

    if (validator.isEmpty(req.body.user_email)) {
      error_messages.push("Please input your email");
    }

    if (!validator.isEmail(req.body.user_email)) {
      error_messages.push("email is not valid");
    }

    if (validator.isEmpty(req.body.user_password)) {
      error_messages.push("Please input your password");
    }

    if (error_messages.length > 0) {
      return next({ messages: error_messages, statusCode: 400 });
    }

    next();
  } catch (error) {
    next(error);
  }
};
