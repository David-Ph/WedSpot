const { vendor } = require("../models");

class Vendors {
  async getVedorsCount(req, res, next) {
    try {
      const vendorsCount = await vendor.count();

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

      const data = await vendor
        .find()
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

  async getVendorsByPage(req, res, next) {
    try {
      // get the page, limit, and movies to skip based on page
      const page = req.query.page;
      const limit = parseInt(req.query.limit) || 15;
      const skipCount = page > 0 ? (page - 1) * limit : 0;

      const sortField = req.query.sort_by || "Wedding package";
      const sortOrder = req.query.sort_order || "desc";

      const data = await vendor
        .find()
        .sort({ [sortField]: sortOrder })
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
      const page = req.query.page;
      const limit = parseInt(req.query.limit) || 5;
      const skipCount = page > 0 ? (page - 1) * limit : 0;

      let data = await vendor
        .findOne({
          _id: req.vendor.user,
        })
        .populate({
          path: "Packages",
          options: {
            limit: limit,
            skip: skipCount,
          },
          populate: {
            path: "package_id",
            select: "_id wedding package",
          },
        });

      if (!data) {
        return next({ statusCode: 404, message: "Vendor not found" });
      }

      res.status(200).json({ data, message: "Vendor found!" });
    } catch (error) {
      next(error);
    }
  }

  async updateVendor(req, res, next) {
    try {
      const newData = await vendor.findOneAndUpdate(
        { _id: req.vendor.user },
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
      const data = await vendor.deleteById(req.params.id);

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
