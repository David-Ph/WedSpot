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
    request_status: {
      type: Boolean,
      default: false,
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

// Enable soft delete, it will make delete column automaticly
quotationSchema.plugin(mongooseDelete, { overrideMethods: "all" });

module.exports = mongoose.model("Request", quotationSchema); // Export transaction models
