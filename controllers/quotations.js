const { Quotation } = require("../models");

class QuotationController {
  async getQuotationByUser(req, res, next) {
    try {
      // ? pagination
      const page = req.query.page;
      const limit = parseInt(req.query.limit) || 15;
      const skipCount = page > 0 ? (page - 1) * limit : 0;

      // ? sorting
      const sortField = req.query.sort_by || "created_at";
      const orderBy = req.query.order_by || "desc";

      let data = await Quotation.find({
        quotation_user_id: req.user.user,
      })
        .sort({ [sortField]: orderBy })
        .limit(limit)
        .skip(skipCount)
        .populate(
          "quotation_vendor_id",
          "_id vendor_email vendor_avatar vendor_name vendor_rating"
        )
        .populate(
          "quotation_user_id",
          "_id user_avatar user_fullname user_email"
        )
        .populate(
          "quotation_request_id",
          "-__v -created_at -updated_at -id -_id -request_status -request_quotation_id -request_user_id -request_vendor_id"
        );

      let count = await Quotation.count({
        quotation_user_id: req.user.user,
      });

      if (data.length === 0) {
        return next({ statusCode: 404, message: "Quotation not found" });
      }

      res.status(200).json({ data, message: "Quotation found!", count });
    } catch (error) {
      next(error);
    }
  }

  async getQuotationByVendor(req, res, next) {
    try {
      // ? pagination
      const page = req.query.page;
      const limit = parseInt(req.query.limit) || 15;
      const skipCount = page > 0 ? (page - 1) * limit : 0;

      // ? sorting
      const sortField = req.query.sort_by || "created_at";
      const orderBy = req.query.order_by || "desc";

      let data = await Quotation.find({
        quotation_vendor_id: req.vendor.user,
      })
        .sort({ [sortField]: orderBy })
        .limit(limit)
        .skip(skipCount)
        .populate(
          "quotation_vendor_id",
          "_id vendor_email vendor_avatar vendor_name vendor_rating"
        )
        .populate(
          "quotation_user_id",
          "_id user_avatar user_fullname user_email"
        )
        .populate(
          "quotation_request_id",
          "-__v -created_at -updated_at -id -_id -request_status -request_quotation_id -request_user_id -request_vendor_id"
        );

      let count = await Quotation.count({
        quotation_vendor_id: req.vendor.user,
      });

      if (data.length === 0) {
        return next({ statusCode: 404, message: "Quotation not found" });
      }

      res.status(200).json({ data, message: "Quotation found!", count });
    } catch (error) {
      next(error);
    }
  }

  async getQuotationById(req, res, next) {
    try {
      let data = await Quotation.findOne({
        _id: req.params.id,
      })
        .populate("quotation_request_id")
        .populate(
          "quotation_vendor_id",
          "_id vendor_email vendor_avatar vendor_name vendor_rating"
        )
        .populate(
          "quotation_user_id",
          "_id user_avatar user_fullname user_email"
        )
        .populate(
          "quotation_request_id",
          "-__v -created_at -updated_at -id -_id -request_status -request_quotation_id -request_user_id -request_vendor_id"
        );

      if (!data) {
        return next({ statusCode: 404, message: "Quotation not found" });
      }

      res.status(200).json({ data, message: "Quotation found!" });
    } catch (error) {
      next(error);
    }
  }

  async createQuotation(req, res, next) {
    try {
      const newData = await Quotation.create(req.body);

      const data = await Quotation.findOne({
        _id: newData._id,
      });

      res
        .status(201)
        .json({ data, message: "New Quotation Successfully Created!" });
    } catch (error) {
      next(error);
    }
  }

  async updateQuotationStatus(req, res, next) {
    try {
      const newData = await Quotation.findOneAndUpdate(
        { _id: req.params.id },
        { quotation_status: req.body.quotation_status },
        { new: true }
      );

      if (!newData) {
        return next({ statusCode: 404, message: "Quotation not found" });
      }

      res
        .status(201)
        .json({ newData, message: "Quotation successfully updated!" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new QuotationController();
