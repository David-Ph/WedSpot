const { User } = require("../models");

class UserController {
  async update_user(req, res, next) {
    try {
      const new_data = await User.findOneAndUpdate(
        { _id: req.user.user },
        req.body,
        { new: true }
      ).select("-password");

      if (!new_data) {
        return next({ statusCode: 404, message: "User is not found" });
      }

      res.status(201).json({ new_data });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
