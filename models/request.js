const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const requestSchema = new mongoose.Schema(
  {
    request_user_id: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "request_user_id can't be empty"],
    },
    request_vendor_id: {
      type: mongoose.Types.ObjectId,
      ref: "Vendor",
      required: [true, "request_vendor_id can't be empty"],
    },
    request_package_id: {
      type: mongoose.Schema.Types.Mixed,
      required: [true, "request_package_id can't be empty"],
    },
    request_groom_name: {
      type: String,
    },
    request_bride_name: {
      type: String,
    },
    request_city: {
      type: String,
    },
    request_wedding_location: {
      type: String,
    },
    request_wedding_date: {
      type: Date,
    },
    request_budget: {
      type: Number,
    },
    request_invitees: {
      type: Number,
    },
    request_status: {
      type: Boolean,
      default: false,
    },
    request_quotation_id: {
      type: mongoose.Types.ObjectId,
      ref: "Quotation",
      default: null,
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
        ret.request_id = ret._id;
        delete ret.id;
        delete ret._id;
        delete ret.deleted;
      },
    },
  }
);

requestSchema.virtual("quotation", {
  ref: "Quotation",
  localField: "_id",
  foreignField: "quotation_request_id",
  justOne: true,
});

// Enable soft delete, it will make delete column automaticly
requestSchema.plugin(mongooseDelete, { overrideMethods: "all" });

module.exports = mongoose.model("Request", requestSchema); // Export transaction models
