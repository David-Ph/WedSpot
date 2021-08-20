const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const vendorSchema = new mongoose.Schema(
  {
    vendor_email: {
      type: String,
      required: true,
      unique: true,
    },
    vendor_password: {
      type: String,
      required: true,
      set: setPassword,
    },
    vendor_name: {
      type: String,
      required: true,
    },
    vendor_email_info: {
      type: String,
    },
    vendor_header: {
      type: String,
      default: null,
    },
    vendor_avatar: {
      type: String,
      default: null,
    },
    vendor_phone: {
      type: String,
    },
    vendor_website: {
      type: String,
    },
    vendor_facebook: {
      type: String,
    },
    vendor_twitter: {
      type: String,
    },
    vendor_instagram: {
      type: String,
    },
    vendor_location: {
      type: String,
    },
    vendor_capacity: {
      type: String,
    },
    vendor_price_range: {
      type: String,
    },
    vendor_type: {
      type: String,
      enum: ["Organizer", "Venue"],
    },
    vendor_has_fiiled_info: {
      type: Boolean,
      default: false,
    },
  },

  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
    toObject: { getters: true },
    toJSON: {
      getters: true,
      versionKey: false,
      transform: function (doc, ret) {
        ret.vendor_id = ret._id;
        delete ret.id;
        delete ret._id;
        delete ret.deleted;
      },
    },
  }
);

function setPassword(password) {
  return bcrypt.hashSync(password, 10);
}

vendorSchema.post("findOneAndUpdate", async function (doc) {
  if (!doc.vendor_has_filled_info) {
    console.log("hello");
    doc.vendor_has_filled_info = true;
    await doc.save();
  }
  console.log(doc);
});

module.exports = mongoose.model("Vendor", vendorSchema);
