const { vendor, User, Notification } = require("../../models");
const validator = require("validator");

exports.queryNotificationValidator = async (req, res, next) => {
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

exports.checkUserValidator = async (req, res, next) => {
  try {
    const errorMessages = [];

    const findNotification = await Notification.findOne({
      _id: req.params.id,
    });

    if (findNotification?.notification_forUser != req.user.user) {
      return next({ statusCode: 403, message: "Forbidden access" });
    }

    if (errorMessages.length > 0) {
      return next({ statusCode: 400, messages: errorMessages });
    }

    next();
  } catch (error) {
    next(error);
  }
};

exports.checkVendorValidator = async (req, res, next) => {
  try {
    const errorMessages = [];

    const findNotification = await Notification.findOne({
      _id: req.params.id,
    });

    if (findNotification?.notification_forVendor != req.vendor.user) {
      return next({ statusCode: 403, message: "Forbidden access" });
    }

    if (errorMessages.length > 0) {
      return next({ statusCode: 400, messages: errorMessages });
    }

    next();
  } catch (error) {
    next(error);
  }
};
