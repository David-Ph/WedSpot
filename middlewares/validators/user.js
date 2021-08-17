const validator = require("validator");
const { promisify } = require("util");

exports.userValidator = async (req, res, next) => {
  try {
    const errorMessages = [];

    if (req.body.fullname && validator.isInt(req.body.fullname)) {
      errorMessages.push("Name has to be a string");
    }

    if (
      req.body.fullname &&
      !validator.isAlphanumeric(req.body.fullname, "en-US", { ignore: "._- " })
    ) {
      errorMessages.push("Name can only contains letters and numbers");
    }

    if (req.body.fullname && req.body.fullname.length < 3) {
      errorMessages.push("Fullname characters minimal is 3");
    }

    if (req.body.email && !validator.isEmail(req.body.email)) {
      errorMessages.push("email is not valid");
    }

    // if (req.body.password && !validator.isStrongPassword(req.body.password)) {
    //   errorMessages.push("password is not strong enough");
    // }

    if (req.files) {
      if (
        !req.files.photo.mimetype.startsWith("image") ||
        req.files.photo.size > 2000000
      ) {
        errorMessages.push("File must be an image and less than 2MB");
      }
      const move = promisify(req.files.photo.mv);
      const newFileName = new Date().getTime() + "_" + req.files.photo.name;
      await move(`./public/images/users/${newFileName}`);
      req.body.photo = newFileName;
    }
    if (errorMessages.length > 0) {
      return next({ statusCode: 400, messages: errorMessages });
    }
    next();
  } catch (error) {
    next(error);
  }
};
