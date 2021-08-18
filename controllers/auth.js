const jwt = require("jsonwebtoken");

class Vendor {
  async getToken(req, res, next) {
    try {
      const data = {
        vendor: req.vendor._id,
      };
      const token = jwt.sign(data, process.env.JWT_SECRET);

      res.status(200).json({ _id: req.vendor._id, token });
    } catch (error) {
      /* istanbul ignore next */
      next(error);
    }
  }
}

module.exports = new Vendor();
