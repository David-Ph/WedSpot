const { vendor } = require("../models");
const request = require("../models/request");

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
      // ? price and capacity filtering
      const minCapacity = parseInt(req.query.vendor_min_capacity) || 0;
      const maxCapacity = parseInt(req.query.vendor_max_capacity) || 10000;
      const minPrice = parseInt(req.query.vendor_min_price) || 0;
      const maxPrice = parseInt(req.query.vendor_max_price) || 3000000000;

      let search = {
        vendor_min_capacity: { $lte: maxCapacity },
        vendor_max_capacity: { $gte: minCapacity },
        vendor_min_price: { $lte: maxPrice },
        vendor_max_price: { $gte: minPrice },
      };
      if (req.query.vendor_type) {
        search.vendor_type = req.query.vendor_type;
      }
      if (req.query.vendor_location) {
        search.vendor_location = req.query.vendor_location;
      }

      // ? pagination
      const page = req.query.page;
      const limit = parseInt(req.query.limit) || 15;
      const skipCount = page > 0 ? (page - 1) * limit : 0;

      // ? sorting
      const sortField = req.query.sort_by || "created_at";
      const orderBy = req.query.order_by || "desc";

      let data = await vendor
        .find(search)
        .sort({ [sortField]: orderBy })
        .limit(limit)
        .skip(skipCount);

      let count = await vendor.count(search);

      if (data.length === 0) {
        return next({ message: "Vendors not found", statusCode: 404 });
      }
      res.status(200).json({ data, count });
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
          _id: req.params.id,
        })
        .populate({
          path: "packages",
          options: {
            limit: limit,
            skip: skipCount,
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
}

//   async deleteVendor(req, res, next) {
//     try {
//       //   for soft delete
//       const data = await vendor.deleteById(req.params.id);

//       if (data.nModified === 0) {
//         return next({ statusCode: 404, message: "Vendor not found" });
//       }

//       res.status(200).json({ message: "Vendor successfully deleted" });
//     } catch (error) {
//       next(error);
//     }
//   }

module.exports = new Vendors();
