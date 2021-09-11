const { User } = require("../models");

class UserController {
  async update_user(req, res, next) {
    try {
      const new_data = await User.findOneAndUpdate(
        { _id: req.user.user },
        req.body,
        { new: true }
      ).select("-user_password");

      if (!new_data) {
        return next({ statusCode: 404, message: "User is not found" });
      }

      res.status(201).json({ new_data });
    } catch (error) {
      next(error);
    }
  }

  async received_user_token(req, res, next) {
    try {
      const new_data = await User.findOneAndUpdate(
        { _id: req.user.user },
        { user_messaging_token: req.body.messaging_token },
        { new: true }
      );

      if (!new_data) {
        return next({
          statusCode: 404,
          message: "User messaging token is not found",
        });
      }

      res.status(201).json({ message: "Token successfully stored" });
    } catch (error) {
      next(error);
    }
  }

  async deleted_user_token(req, res, next) {
    try {
      const new_data = await User.findOneAndUpdate(
        { _id: req.user.user },
        { user_messaging_token: null },
        { new: true }
      );

      if (!new_data) {
        return next({
          statusCode: 404,
          message: "User messaging token is not found",
        });
      }

      res.status(201).json({ message: "Remove token successfully" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
