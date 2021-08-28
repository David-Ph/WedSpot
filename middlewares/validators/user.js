const validator = require("validator");
const { promisify } = require("util");
const { User } = require("../../models");
const bcrypt = require("bcrypt");

exports.user_validator = async (req, res, next) => {
  try {
    const error_messages = [];

    if (validator.isEmpty(req.body.user_fullname)) {
      error_messages.push("Fullname can not be empty");
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

    if (validator.isEmpty(req.body.user_email)) {
      error_messages.push("Please input your email");
    }

    if (!validator.isEmail(req.body.user_email)) {
      error_messages.push("email is not valid");
    }

    if (validator.isEmpty(req.body.user_birthday)) {
      error_messages.push("Please input your birthday");
    }

    if (!validator.isDate(req.body.user_birthday)) {
      error_messages.push("Birthday is not valid");
    }

    if (req.body.user_password) {
      // if user change password, check for old password and current password
      if (req.body.user_old_password) {
        const data = await User.findOne({ _id: req.user.user });

        const validate = await bcrypt.compare(
          req.body.user_old_password,
          data.user_password
        );

        if (!validate) {
          return next({ statusCode: 400, messages: "Wrong old password" });
        }

        if (!validator.isStrongPassword(req.body.user_password)) {
          error_messages.push("password is not strong enough");
        }
      } else {
        return next({
          statusCode: 400,
          messages: "Please input old password",
        });
      }
    }

    if (req.file) {
      req.body.user_avatar = req.file.path;
    }

    if (error_messages.length > 0) {
      return next({ statusCode: 400, messages: error_messages });
    }
    next();
  } catch (error) {
    next(error);
  }
};
