const validator = require("validator");
const { promisify } = require("util");

exports.user_validator = async (req, res, next) => {
  try {
    const error_messages = [];

    if (req.body.email && !validator.isEmail(req.body.user_email)) {
      error_messages.push("email is not valid");
    }

    if (
      req.body.password &&
      !validator.isStrongPassword(req.body.user_password)
    ) {
      error_messages.push("password is not strong enough");
    }

    if (error_messages.length > 0) {
      return next({ statusCode: 400, messages: error_messages });
    }
    next();
  } catch (error) {
    next(error);
  }
};
