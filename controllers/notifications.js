const { Notification } = require("../models");

class NotificationController {
  async getNotifVendor(req, res, next) {
    try {
      // ? pagination
      const page = req.query.page;
      const limit = parseInt(req.query.limit) || 15;
      const skipCount = page > 0 ? (page - 1) * limit : 0;

      // ? sorting
      const sortField = req.query.sort_by || "created_at";
      const orderBy = req.query.order_by || "desc";

      const data = await Notification.find({
        notification_forVendor: req.vendor.user,
      })
        .sort({ [sortField]: orderBy })
        .limit(limit)
        .skip(skipCount);

      if (data.length === 0) {
        return next({ statusCode: 404, message: "Notification not found" });
      }

      const newNotifications = await Notification.count({
        notification_forVendor: req.vendor._id,
        notification_isNew: true,
      });

      res.status(200).json({ data, count: data.length, newNotifications });
    } catch (error) {
      next(error);
    }
  }

  async getNotifUser(req, res, next) {
    try {
      // ? pagination
      const page = req.query.page;
      const limit = parseInt(req.query.limit) || 15;
      const skipCount = page > 0 ? (page - 1) * limit : 0;

      // ? sorting
      const sortField = req.query.sort_by || "created_at";
      const orderBy = req.query.order_by || "desc";

      const data = await Notification.find({
        notification_forUser: req.user.user,
      })
        .sort({ [sortField]: orderBy })
        .limit(limit)
        .skip(skipCount);

      if (data.length === 0) {
        return next({ statusCode: 404, message: "Notification not found" });
      }

      const newNotifications = await Notification.count({
        notification_forUser: req.user._id,
        notification_isNew: true,
      });

      res.status(200).json({ data, count: data.length, newNotifications });
    } catch (error) {
      next(error);
    }
  }

  async updateNotificationVendor(req, res, next) {
    try {
      const newData = await Notification.findOneAndUpdate(
        { _id: req.params.id },
        { notification_isNew: false },
        { new: true }
      );

      res
        .status(201)
        .json({ newData, message: "Notification successfully updated!" });
    } catch (error) {
      next(error);
    }
  }

  async updateNotificationUser(req, res, next) {
    try {
      const newData = await Notification.findOneAndUpdate(
        { _id: req.params.id },
        { notification_isNew: false },
        { new: true }
      );

      res
        .status(201)
        .json({ newData, message: "Notification successfully updated!" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new NotificationController();
