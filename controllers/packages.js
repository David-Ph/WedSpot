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
      // ? filtering
      const minCapacity = parseInt(req.query.min_capacity) || 0;
      const maxCapacity = parseInt(req.query.max_capacity) || 10000;
      const minPrice = parseInt(req.query.min_price) || 0;
      const maxPrice = parseInt(req.query.max_price) || 3000000000;

      const subQuery = {};
      if (req.query.type) subQuery.package_type = req.query.type;
      if (req.query.location) subQuery.package_location = req.query.location;

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

      // filter based on capacity
      data = data.filter((pack) => {
        return filterPackageCapacity(
          pack,
          minCapacity,
          maxCapacity,
          minPrice,
          maxPrice
        );
      });

      if (data.length === 0) {
        return next({ message: "Packages not found", statusCode: 404 });
      }

      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }

  async getPackageById(req, res, next) {
    try {
      let data = await Package.findOne({
        _id: req.params.id,
      });

      if (!data) {
        return next({ statusCode: 404, message: "Package not found" });
      }

      res.status(200).json({ data, message: "Package found!" });
    } catch (error) {
      next(error);
    }
  }

  //   async getMoviesByCategory(req, res, next) {
  //     try {
  //       const category = req.params.tag;
  //       // get the page, limit, and movies to skip based on page
  //       const page = req.query.page;
  //       const limit = parseInt(req.query.limit) || 15;
  //       const skipCount = page > 0 ? (page - 1) * limit : 0;

  //       const sortField = req.query.sort_by || "releaseDate";
  //       const sortOrder = req.query.sort_order || "desc";

  //       // only find movies that has the category from req.params.tag
  //       const data = await Movie.find({ categories: category })
  //         .sort({ [sortField]: sortOrder })
  //         .limit(limit)
  //         .skip(skipCount);

  //       if (data.length === 0) {
  //         return next({ message: "Movie not found", statusCode: 404 });
  //       }

  //       res.status(200).json({ data });
  //     } catch (error) {
  //       next(error);
  //     }
  //   }

  //   async getMoviesByTitle(req, res, next) {
  //     try {
  //       const searchQuery = req.query.title;
  //       // get the page, limit, and movies to skip based on page
  //       const page = req.query.page;
  //       const limit = parseInt(req.query.limit) || 15;
  //       const skipCount = page > 0 ? (page - 1) * limit : 0;

  //       const sortField = req.query.sort_by || "releaseDate";
  //       const sortOrder = req.query.sort_order || "desc";

  //       // look for movies by title
  //       // use case insensitive regex to find it
  //       const data = await Movie.find({ title: new RegExp(searchQuery, "i") })
  //         .sort({ [sortField]: sortOrder })
  //         .limit(limit)
  //         .skip(skipCount);
  //       if (data.length === 0) {
  //         return next({ message: "Movie not found", statusCode: 404 });
  //       }

  //       res.status(200).json({ data });
  //     } catch (error) {
  //       next(error);
  //     }
  //   }

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
}

function filterPackageCapacity(
  package,
  minCapacity,
  maxCapacity,
  minPrice,
  maxPrice
) {
  const packagePrice = parseInt(package.package_price);
  const packageMinCapacity = parseInt(package.package_capacity.split("-")[0]);
  const packageMaxCapacity = parseInt(package.package_capacity.split("-")[1]);
  // (s1 <= e2) && (s2 <= e1)
  return (
    minCapacity <= packageMaxCapacity &&
    packageMinCapacity <= maxCapacity &&
    minPrice <= packagePrice &&
    packagePrice <= maxPrice
  );
}

module.exports = new PackageController();
