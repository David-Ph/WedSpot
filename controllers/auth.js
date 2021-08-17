const jwt = require("jsonwebtoken"); // import jwt
const { user } = require("../models");

class Auth {
  async get_token(req, res, next) {
    try {
      const data = {
        user: req.user._id,
      };

      const token = jwt.sign(data, process.env.JWT_SECRET, {
        expiresIn: "60d",
      });

      const current_user = await user
        .findOne({ _id: req.user._id })
        .select("-password");

      res.status(200).json({ token, current_user });
    } catch (error) {
      next(error);
    }
  }

  async get_me(req, res, next) {
    try {
      const data = await user
        .findOne({ _id: req.user.user })
        .select("-password");

      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new Auth();
