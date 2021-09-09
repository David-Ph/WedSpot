const mongoose = require("mongoose");
const moment = require("moment");

const notificationSchema = new mongoose.Schema(
  {
    notification_forVendor: {
      type: mongoose.Types.ObjectId,
      ref: "Vendor",
    },
    notification_forUser: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    notification_title: {
      type: String,
      required: true,
    },
    notification_body: {
      type: String,
      required: true,
    },
    notification_isNew: {
      type: Boolean,
      required: true,
      default: false,
    },
    notification_payload: {
      type: mongoose.Schema.Types.Mixed,
    },
    notification_type: {
      type: String,
      enum: ["request", "quotation"],
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
        ret.notification_id = ret._id;
        delete ret.id;
        delete ret._id;
        delete ret.deleted;
      },
    },
  }
);

module.exports = mongoose.model("Notification", notificationSchema); // Export transaction models
