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

      const currentUser = await vendor
        .findOne({ _id: req.vendor._id })
        .select("-password");

      res.status(200).json({ token, currentVendor });
    } catch (error) {
      next(error);
    }
  }

  async getMe(req, res, next) {
    try {
      const data = await vendor
        .findOne({ _id: req.vendor.vendor })
        // .populate("reviews")
        .select("-password");

      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new Vendor();
