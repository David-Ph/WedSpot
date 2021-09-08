const { Request } = require("../models");

class RequestController {
  async getRequestsByUser(req, res, next) {
    try {
      // ? filtering by status
      let subQuery = {
        request_user_id: req.user.user,
      };

      if (req.query.status) subQuery.request_status = req.query.status;

      // ? pagination
      const page = req.query.page;
      const limit = parseInt(req.query.limit) || 15;
      const skipCount = page > 0 ? (page - 1) * limit : 0;

      // ? sorting
      const sortField = req.query.sort_by || "created_at";
      const orderBy = req.query.order_by || "desc";

      let data = await Request.find(subQuery)
        .sort({ [sortField]: orderBy })
        .limit(limit)
        .skip(skipCount)
        .populate(
          "request_vendor_id",
          "_id vendor_avatar vendor_name vendor_rating"
        )
        .populate(
          "quotation",
          "_id quotation_file quotation_status -quotation_request_id"
        );

      let count = await Request.count(subQuery);

      if (data.length === 0) {
        return next({ statusCode: 404, message: "Request not found" });
      }

      res.status(200).json({ data, message: "Request found!", count });
    } catch (error) {
      next(error);
    }
  }

  async getRequestsByVendor(req, res, next) {
    try {
      // ? filtering by status
      let subQuery = {
        request_vendor_id: req.vendor.user,
      };

      if (req.query.status) subQuery.request_status = req.query.status;

      // ? pagination
      const page = req.query.page;
      const limit = parseInt(req.query.limit) || 15;
      const skipCount = page > 0 ? (page - 1) * limit : 0;

      // ? sorting
      const sortField = req.query.sort_by || "created_at";
      const orderBy = req.query.order_by || "desc";

      let data = await Request.find(subQuery)
        .sort({ [sortField]: orderBy })
        .limit(limit)
        .skip(skipCount)
        .populate("request_user_id", "_id user_avatar user_fullname user_email")
        .populate(
          "quotation",
          "_id quotation_file quotation_status -quotation_request_id"
        );

      let count = await Request.count(subQuery);

      if (data.length === 0) {
        return next({ statusCode: 404, message: "Request not found" });
      }

      res.status(200).json({ data, message: "Request found!", count });
    } catch (error) {
      next(error);
    }
  }

  async getRequestById(req, res, next) {
    try {
      let data = await Request.findOne({
        _id: req.params.id,
      })
        .populate(
          "quotation",
          "_id quotation_file quotation_status -quotation_request_id"
        )
        .populate(
          "request_vendor_id",
          "_id vendor_email vendor_avatar vendor_name vendor_rating"
        )
        .populate(
          "request_user_id",
          "_id user_avatar user_fullname user_email"
        );

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
}

module.exports = new RequestController();
