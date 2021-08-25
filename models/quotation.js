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

quotationSchema.post("save", function () {
  this.constructor.updateRequestStatus(this.quotation_request_id);
});

// Enable soft delete, it will make delete column automaticly
quotationSchema.plugin(mongooseDelete, { overrideMethods: "all" });

module.exports = mongoose.model("Quotation", quotationSchema); // Export transaction models
