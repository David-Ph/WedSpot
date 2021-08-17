const validator = require("validator");
const { promisify } = require("util");

exports.user_validator = async (req, res, next) => {
  try {
    const error_messages = [];

    if (req.body.fullname && validator.isInt(req.body.fullname)) {
      error_messages.push("Name has to be a string");
    }

    if (
      req.body.fullname &&
      !validator.isAlphanumeric(req.body.fullname, "en-US", { ignore: "._- " })
    ) {
      error_messages.push("Name can only contains letters and numbers");
    }

    if (req.body.fullname && req.body.fullname.length < 3) {
      error_messages.push("Fullname characters minimal is 3");
    }

    if (req.body.email && !validator.isEmail(req.body.email)) {
      error_messages.push("email is not valid");
    }

    // if (req.body.password && !validator.isStrongPassword(req.body.password)) {
    //   errorMessages.push("password is not strong enough");
    // }

    if (req.files) {
      if (
        !req.files.photo.mimetype.startsWith("image") ||
        req.files.photo.size > 2000000
      ) {
        error_messages.push("File must be an image and less than 2MB");
      }
      const move = promisify(req.files.photo.mv);
      const new_file_name = new Date().getTime() + "_" + req.files.photo.name;
      await move(`./public/images/users/${new_file_name}`);
      req.body.photo = new_file_name;
    }
    if (error_messages.length > 0) {
      return next({ statusCode: 400, messages: error_messages });
    }
    next();
  } catch (error) {
    next(error);
  }
};
