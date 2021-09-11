const { vendor, Notification } = require("../models");

const jwt = require("jsonwebtoken");

class Vendor {
  async getToken(req, res, next) {
    try {
      const data = {
        user: req.vendor._id,
      };

      const token = jwt.sign(data, process.env.JWT_SECRET, {
        expiresIn: "60d",
      });

      const currentVendor = await vendor
        .findOne({ _id: req.vendor._id })
        .select("-password");

      const newNotifications = await Notification.count({
        notification_forVendor: req.vendor._id,
        notification_isNew: true,
      });

      res.status(200).json({ token, currentVendor, newNotifications });
    } catch (error) {
      next(error);
    }
  }

  async getTokenOAuth(req, res, next) {
    try {
      const data = {
        user: req.vendor._id,
      };

      const token = jwt.sign(data, process.env.JWT_SECRET, {
        expiresIn: "60d",
      });

      res.redirect(process.env.VENDOR_FE_CALLBACK + "?token=" + token);
    } catch (error) {
      next(error);
    }
  }

  async getTokenOAuthMobile(req, res, next) {
    try {
      const data = {
        user: req.vendor._id,
      };

      const token = jwt.sign(data, process.env.JWT_SECRET, {
        expiresIn: "60d",
      });

      res.redirect(process.env.VENDOR_RN_CALLBACK + "?token=" + token);
    } catch (error) {
      next(error);
    }
  }

  async getMe(req, res, next) {
    try {
      const data = await vendor
        .findOne({ _id: req.vendor.user })
        // .populate("reviews")
        .select("-password");

      const newNotifications = await Notification.count({
        notification_forVendor: req.vendor._id,
        notification_isNew: true,
      });

      res.status(200).json({ data, newNotifications });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new Vendor();
