const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const quotationSchema = new mongoose.Schema(
  {
    quotation_vendor_id: {
      type: mongoose.Types.ObjectId,
      ref: "Vendor",
      required: [true, "quotation_vendor_id can't be empty"],
    },
    quotation_request_id: {
      type: mongoose.Types.ObjectId,
      ref: "Request",
      required: [true, "quotation_request_id can't be empty"],
    },
    quotation_user_id: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "quotation_user_id can't be empty"],
    },
    quotation_file: {
      type: String,
      required: [true, "quotation_file can't be empty"],
    },
    quotation_status: {
      type: String,
      default: null,
      enum: ["accepted", "rejected", null],
    },
  },
  {
    // Enables timestamps
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
    toObject: { getters: true },
    toJSON: {
      getters: true,
      versionKey: false,
      transform: function (doc, ret) {
        ret.quotation_id = ret._id;
        delete ret.id;
        delete ret._id;
        delete ret.deleted;
      },
    },
  }
);

// Static method to get average rating
quotationSchema.statics.updateRequestStatus = async function (request_id) {
  try {
    await this.model("Request").findByIdAndUpdate(request_id, {
      request_status: true,
    });
  } catch (e) {
    console.error(e);
  }
};

quotationSchema.statics.updateRequestQuotationId = async function (
  request_id,
  quotation_id
) {
  try {
    await this.model("Request").findByIdAndUpdate(request_id, {
      request_quotation_id: quotation_id,
    });
  } catch (e) {
    console.error(e);
  }
};

quotationSchema.statics.sendNotification = async function (quotation) {
  try {
    const findVendor = await this.model("Vendor").findOne({
      _id: quotation.quotation_vendor_id,
    });
    const findUser = await this.model("User").findOne({
      _id: quotation.quotation_user_id,
    });
    const findRequest = await this.model("Request").findOne({
      _id: quotation.quotation_request_id,
    });

    const userNotification = await this.model("Notification").create({
      notification_title: "Your requested quotation is here!",
      notification_body: `${findVendor.vendor_name} has sent you a quotation`,
      notification_forUser: findUser._id,
      notification_payload: {
        request_id: findRequest._id,
        request_vendor_id: findRequest.request_vendor_id,
        request_user_id: findRequest.request_user_id,
        request_package_id: findRequest.request_package_id._id,
      },
      notification_type: "request",
    });

    // const vendorNotification = await this.model("Notification").create({
    //   notification_title: "Request for quotation!",
    //   notification_body: `You have 1 request for quotation`,
    //   notification_forVendor: findVendor._id,
    //   notification_payload: {
    //     request_id: findRequest._id,
    //     request_vendor_id: findRequest.request_vendor_id,
    //     request_user_id: findRequest.request_user_id,
    //     request_package_id: findRequest.request_package_id._id,
    //   },
    //   notification_type: "request",
    // });
  } catch (error) {
    console.error(error);
  }
};

quotationSchema.post("save", function () {
  this.constructor.updateRequestStatus(this.quotation_request_id);
  this.constructor.updateRequestQuotationId(
    this.quotation_request_id,
    this._id
  );
  this.constructor.sendNotification(this);
});

// Enable soft delete, it will make delete column automaticly
quotationSchema.plugin(mongooseDelete, { overrideMethods: "all" });

module.exports = mongoose.model("Quotation", quotationSchema); // Export transaction models
