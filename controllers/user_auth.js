const jwt = require("jsonwebtoken"); // import jwt
const { User, Notification } = require("../models");

class Auth {
  async get_token(req, res, next) {
    try {
      const data = {
        user: req.user._id,
      };

      const token = jwt.sign(data, process.env.JWT_SECRET, {
        expiresIn: "60d",
      });

      const current_user = await User.findOne({ _id: req.user._id }).select([
        "-user_password",
        "-created_At",
        "-updated_At",
      ]);

      const newNotifications = await Notification.count({
        notification_forUser: req.user._id,
        notification_isNew: true,
      });

      res.status(200).json({ token, current_user, newNotifications });
    } catch (error) {
      next(error);
    }
  }

  async get_me(req, res, next) {
    try {
      const data = await User.findOne({ _id: req.user.user }).select(
        "-user_password"
      );

      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new Auth();
