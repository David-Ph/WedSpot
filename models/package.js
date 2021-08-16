const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const packageSchema = new mongoose.Schema(
  {
    package_vendor_id: {
      type: mongoose.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },
    package_type: {
      type: String,
      required: true,
    },
    package_name: {
      type: String,
    },
    package_location: {
      type: String,
    },
    package_price: {
      type: String,
    },
    package_details: {
      type: String,
    },
    package_services: [
      {
        type: String,
      },
    ],
    package_album: [
      {
        type: String,
      },
    ],
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
        ret.package_id = ret._id;
        delete ret.id;
        delete ret._id;
        delete ret.deleted;
      },
    },
  }
);

// movieSchema.virtual("requests", {
//   ref: "Request",
//   localField: "_id",
//   foreignField: "movie_id",
//   justOne: false,
// });

// Enable soft delete, it will make delete column automaticly
packageSchema.plugin(mongooseDelete, { overrideMethods: "all" });

module.exports = mongoose.model("Package", packageSchema); // Export transaction models
