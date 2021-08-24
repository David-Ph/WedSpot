const { Request } = require("../models");

class RequestController {
  async getRequestCount(req, res, next) {
    try {
      const requestCount = await Request.count();

      res.status(200).json({ data: requestCount });
    } catch (error) {
      next(error);
    }
  }

  async getRequests(req, res, next) {
    try {
      // ? pagination
      const page = req.query.page;
      const limit = parseInt(req.query.limit) || 15;
      const skipCount = page > 0 ? (page - 1) * limit : 0;

      // ? sorting
      const sortField = req.query.sort_by || "created_at";
      const orderBy = req.query.order_by || "desc";

      let data = await Request.find()
        .sort({ [sortField]: orderBy })
        .limit(limit)
        .skip(skipCount);

      let count = await Request.count();

      if (data.length === 0) {
        return next({ message: "Request not found", statusCode: 404 });
      }

      res.status(200).json({ data, count, count: data.length });
    } catch (error) {
      next(error);
    }
  }

  async getRequestsByUser(req, res, next) {
    try {
      let data = await Request.find({
        request_user_id: req.user.user,
      });

      if (data.length === 0) {
        return next({ statusCode: 404, message: "Request not found" });
      }

      res
        .status(200)
        .json({ data, message: "Request found!", count: data.length });
    } catch (error) {
      next(error);
    }
  }

  async getRequestsByVendor(req, res, next) {
    try {
      let data = await Request.find({
        request_vendor_id: req.vendor.user,
      });

      if (data.length === 0) {
        return next({ statusCode: 404, message: "Request not found" });
      }

      res
        .status(200)
        .json({ data, message: "Request found!", count: data.length });
    } catch (error) {
      next(error);
    }
  }

  async getRequestById(req, res, next) {
    try {
      let data = await Request.findOne({
        _id: req.params.id,
      });

      if (!data) {
        return next({ statusCode: 404, message: "Request not found" });
      }

      res.status(200).json({ data, message: "Request found!" });
    } catch (error) {
      next(error);
    }
  }

  async createRequest(req, res, next) {
    try {
      const newData = await Request.create(req.body);

      const data = await Request.findOne({
        _id: newData._id,
      });

      res
        .status(201)
        .json({ data, message: "New Request Successfully Created!" });
    } catch (error) {
      next(error);
    }
  }

  async updateRequestStatus(req, res, next) {
    try {
      const newData = await Request.findOneAndUpdate(
        { _id: req.params.id },
        { request_status: req.body.request_status },
        { new: true }
      );

      if (!newData) {
        return next({ statusCode: 404, message: "Request not found" });
      }

      res
        .status(201)
        .json({ newData, message: "Request successfully updated!" });
    } catch (error) {
      next(error);
    }
  }

  async deleteRequest(req, res, next) {
    try {
      //   for soft delete
      const data = await Request.deleteById(req.params.id);

      if (data.nModified === 0) {
        return next({ statusCode: 404, message: "Request not found" });
      }

      res.status(200).json({ message: "Request successfully deleted" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new RequestController();