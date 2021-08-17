const validator = require("validator");
const { promisify } = require("util");

exports.user_validator = async (req, res, next) => {
  try {
    const error_messages = [];

    if (req.body.email && !validator.isEmail(req.body.email)) {
      error_messages.push("email is not valid");
    }

    if (req.body.password && !validator.isStrongPassword(req.body.password)) {
      error_messages.push("password is not strong enough");
    }

    // if (req.files) {
    //   if (
    //     !req.files.photo.mimetype.startsWith("image") ||
    //     req.files.photo.size > 2000000
    //   ) {
    //     error_messages.push("File must be an image and less than 2MB");
    //   }
    //   const move = promisify(req.files.photo.mv);
    //   const new_file_name = new Date().getTime() + "_" + req.files.photo.name;
    //   await move(`./public/images/users/${new_file_name}`);
    //   req.body.photo = new_file_name;
    // }
    if (error_messages.length > 0) {
      return next({ statusCode: 400, messages: error_messages });
    }
    next();
  } catch (error) {
    next(error);
  }
};
