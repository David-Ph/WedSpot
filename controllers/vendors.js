const { vendor } = require("../models");

class Vendors {
  async getVedorsCount(req, res, next) {
    try {
      const vendorsCount = await Vendor.count();

      res.status(200).json({ data: vendorsCount });
    } catch (error) {
      next(error);
    }
  }

  async getVendors(req, res, next) {
    try {
      // get the page, limit, and vendors to skip based on page
      const page = req.query.page;
      const limit = parseInt(req.query.limit) || 15;
      const skipCount = page > 0 ? (page - 1) * limit : 0;

      const sortField = req.query.sort_by || "created_at";
      const orderBy = req.query.order_by || "desc";

      const data = await Vendor.find()
        .sort({ [sortField]: orderBy })
        .limit(limit)
        .skip(skipCount);

      if (data.length === 0) {
        return next({ message: "Vendor not found", statusCode: 404 });
      }

      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }

  async getVendorById(req, res, next) {
    try {
      let data = await Vendor.findOne({
        _id: req.params.id,
      });

      if (!data) {
        return next({ statusCode: 404, message: "Vendor not found" });
      }

      res.status(200).json({ data, message: "Vendor found!" });
    } catch (error) {
      next(error);
    }
  }

  async createVendor(req, res, next) {
    try {
      const newData = await Vendor.create(req.body);

      const data = await Vendor.findOne({
        _id: newData._id,
      });

      res
        .status(201)
        .json({ data, message: "New Vendor Successfully Created!" });
    } catch (error) {
      next(error);
    }
  }

  async updateVendor(req, res, next) {
    try {
      const newData = await Vendor.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      );

      if (!newData) {
        return next({ statusCode: 404, message: "Vendor not found" });
      }

      res
        .status(201)
        .json({ newData, message: "Vendor successfully updated!" });
    } catch (error) {
      next(error);
    }
  }

  async deleteVendor(req, res, next) {
    try {
      //   for soft delete
      const data = await Vendor.deleteById(req.params.id);

      if (data.nModified === 0) {
        return next({ statusCode: 404, message: "Vendor not found" });
      }

      res.status(200).json({ message: "Vendor successfully deleted" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new Vendors();
