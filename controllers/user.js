const { user } = require("../models");

class User {
  async update_user(req, res, next) {
    try {
      const new_data = await user
        .findOneAndUpdate({ _id: req.user.user }, req.body, { new: true })
        .select("-password");

      if (!new_data) {
        return next({ statusCode: 404, message: "User is not found" });
      }

      res.status(201).json({ newData });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new User();
