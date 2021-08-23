const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    user_email: {
      type: String,
      required: true,
      unique: true,
    },
    user_password: {
      type: String,
      required: true,
      set: setPassword,
    },
    user_fullname: {
      type: String,
    },
    user_birthday: {
      type: String,
    },
    user_avatar: {
      type: String,
      get: getPhoto,
      default:
        "https://www.personality-insights.com/wp-content/uploads/2017/12/default-profile-pic-e1513291410505.jpg",
    },
  },
  {
    // Enables timestamps
    timestamps: {
      createdAt: "created_At",
      updatedAt: "updated_At",
    },
    toObject: { getters: true },
    toJSON: {
      getters: true,
      versionKey: false,
      transform: function (doc, ret) {
        ret.user_id = ret._id;
        delete ret.id;
        delete ret._id;
        delete ret.deleted;
      },
    },
  }
);

/* Getter photo */
function getPhoto(photo) {
  if (!photo || photo.includes("https") || photo.includes("http")) {
    return photo;
  }

  return `${process.env.HOST}/images/users/${photo}`;
}

function setPassword(password) {
  return bcrypt.hashSync(password, 10);
}

// Enable soft delete, it will make delete column automaticly
userSchema.plugin(mongooseDelete, { overrideMethods: "all" });

module.exports = mongoose.model("User", userSchema);
