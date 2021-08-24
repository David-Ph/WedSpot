const { Package } = require("../models");

class PackageController {
  async getPackagesCount(req, res, next) {
    try {
      const packagesCount = await Package.count();

      res.status(200).json({ data: packagesCount });
    } catch (error) {
      next(error);
    }
  }

  async getPackages(req, res, next) {
    try {
      // ? price and capacity filtering
      const minCapacity = parseInt(req.query.min_capacity) || 0;
      const maxCapacity = parseInt(req.query.max_capacity) || 10000;
      const minPrice = parseInt(req.query.min_price) || 0;
      const maxPrice = parseInt(req.query.max_price) || 3000000000;

      // ? type and location filtering
      const subQuery = {
        package_min_capacity: { $lte: maxCapacity },
        package_max_capacity: { $gte: minCapacity },
        package_price: { $gte: minPrice, $lte: maxPrice },
      };

      // if there is req.vendor.user, show packages for that vendor
      // otherwise, show packages for visitors/users
      req.vendor?.user
        ? (subQuery.package_vendor_id = req.vendor.user)
        : (subQuery.package_status = "published");

      if (req.queryPolluted?.type) req.query.type = req.queryPolluted.type;
      if (req.query.type) subQuery.package_type = req.query.type;

      if (req.queryPolluted?.location)
        req.query.location = req.queryPolluted.location;
      if (req.query.location) subQuery.package_location = req.query.location;

      // ? search tags
      if (req.query.search)
        subQuery.package_services = new RegExp(req.query.search, "i");

      // ? pagination
      const page = req.query.page;
      const limit = parseInt(req.query.limit) || 15;
      const skipCount = page > 0 ? (page - 1) * limit : 0;

      // ? sorting
      const sortField = req.query.sort_by || "created_at";
      const orderBy = req.query.order_by || "desc";

      let data = await Package.find(subQuery)
        .sort({ [sortField]: orderBy })
        .limit(limit)
        .skip(skipCount);

      let count = await Package.count(subQuery);

      if (data.length === 0) {
        return next({ message: "Packages not found", statusCode: 404 });
      }

      res.status(200).json({ data, count });
    } catch (error) {
      next(error);
    }
  }

  async getPackageById(req, res, next) {
    try {
      let data = await Package.findOne({
        _id: req.params.id,
      }).populate("package_vendor_id");

      if (!data) {
        return next({ statusCode: 404, message: "Package not found" });
      }

      res.status(200).json({ data, message: "Package found!" });
    } catch (error) {
      next(error);
    }
  }

  // to get packages by vendor id
  async getPackagesByVendorId(req, res, next) {
    try {
      // ? pagination
      const page = req.query.page;
      const limit = parseInt(req.query.limit) || 15;
      const skipCount = page > 0 ? (page - 1) * limit : 0;

      // ? sorting
      const sortField = req.query.sort_by || "created_at";
      const orderBy = req.query.order_by || "desc";

      let data = await Package.find({
        package_status: "published",
        package_vendor_id: req.params.vendor_id,
      })
        .sort({ [sortField]: orderBy })
        .limit(limit)
        .skip(skipCount);

      let count = await Package.count({
        package_status: "published",
        package_vendor_id: req.params.vendor_id,
      });

      if (data.length === 0) {
        return next({ message: "Packages not found", statusCode: 404 });
      }

      res.status(200).json({ data, count });
    } catch (error) {
      next(error);
    }
  }

  async createPackage(req, res, next) {
    try {
      const newData = await Package.create(req.body);

      const data = await Package.findOne({
        _id: newData._id,
      });

      res
        .status(201)
        .json({ data, message: "New Package Successfully Created!" });
    } catch (error) {
      next(error);
    }
  }

  async updatePackage(req, res, next) {
    try {
      const newData = await Package.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      );

      if (!newData) {
        return next({ statusCode: 404, message: "Package not found" });
      }

      res
        .status(201)
        .json({ newData, message: "Package successfully updated!" });
    } catch (error) {
      next(error);
    }
  }

  async deletePackage(req, res, next) {
    try {
      //   for soft delete
      const data = await Package.deleteById(req.params.id);

      if (data.nModified === 0) {
        return next({ statusCode: 404, message: "Package not found" });
      }

      res.status(200).json({ message: "Package successfully deleted" });
    } catch (error) {
      next(error);
    }
  }

  async getArchivedPackage(req, res, next) {
    try {
      const data = await Package.findDeleted({
        package_vendor_id: req.vendor.user,
      });

      if (data.length === 0) {
        return next({ statusCode: 404, message: "Package not found" });
      }

      res.status(200).json({
        data,
        count: data.length,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PackageController();
