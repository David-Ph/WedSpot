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
      default:
        "https://images.unsplash.com/photo-1518049362265-d5b2a6467637?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=360&ixid=MnwxfDB8MXxyYW5kb218MHx8dmVudWV8fHx8fHwxNjI5MjUxNjk0&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1440",
    },
    vendor_avatar: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1522413452208-996ff3f3e740?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=360&ixid=MnwxfDB8MXxyYW5kb218MHx8dmVudWV8fHx8fHwxNjI5MjUxODM0&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1440",
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
    vendor_min_capacity: {
      type: Number,
    },
    vendor_max_capacity: {
      type: Number,
    },
    vendor_min_price: {
      type: Number,
    },
    vendor_max_price: {
      type: Number,
    },
    vendor_type: {
      type: String,
      enum: ["organizer", "venue"],
    },
    vendor_has_filled_info: {
      type: Boolean,
      default: false,
    },
    vendor_rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    vendor_messaging_token: {
      type: String,
      default: null,
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

vendorSchema.virtual("packages", {
  ref: "Package",
  localField: "_id",
  foreignField: "package_vendor_id",
  justOne: false,
});

vendorSchema.post("findOneAndUpdate", async function (doc) {
  if (!doc.vendor_has_filled_info) {
    doc.vendor_has_filled_info = true;
    await doc.save();
  }
});

module.exports = mongoose.model("Vendor", vendorSchema);
