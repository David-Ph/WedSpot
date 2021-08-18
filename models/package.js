const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const packageSchema = new mongoose.Schema(
  {
    package_vendor_id: {
      type: mongoose.Types.ObjectId,
      ref: "Vendor",
      required: [true, "package_vendor_id can't be empty"],
    },
    package_type: {
      type: String,
      required: [true, "package_type can't be empty"],
    },
    package_name: {
      type: String,
      required: [true, "package_name can't be empty"],
    },
    package_location: {
      type: String,
    },
    package_price: {
      type: Number,
    },
    package_capacity: {
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
        get: getPhoto,
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

function getPhoto(photo) {
  if (!photo || photo.includes("https") || photo.includes("http")) {
    return photo;
  }

  return `${process.env.HOST}/images/packages/album/${photo}`;
}

// Enable soft delete, it will make delete column automaticly
packageSchema.plugin(mongooseDelete, { overrideMethods: "all" });

module.exports = mongoose.model("Package", packageSchema); // Export transaction models
