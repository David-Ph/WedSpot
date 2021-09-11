const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const axios = require("axios");
const url = "https://fcm.googleapis.com/fcm/send";

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

requestSchema.statics.sendNotification = async function (request) {
  try {
    const findVendor = await this.model("Vendor").findOne({
      _id: request.request_vendor_id,
    });
    const findUser = await this.model("User").findOne({
      _id: request.request_user_id,
    });

    const userNotification = await this.model("Notification").create({
      notification_title: "Your request has already been sent",
      notification_body: `Yay! Your request for quotation has been sent to ${findVendor.vendor_name}`,
      notification_forUser: findUser._id,
      notification_payload: {
        request_id: request._id,
        request_vendor_id: request.request_vendor_id,
        request_user_id: request.request_user_id,
        request_package_id: request.request_package_id._id,
      },
      notification_type: "request",
    });

    const pushToUser = await axios.post(
      url,
      {
        to: "eMsJhkpIbjs4gyQN5_Eitv:APA91bG2cTShzfT7lNOkzq6nsyaQEqN91rjnZGzjlbaQP02hlRFC8rmvYYsM61520gnsB3iK80D-ajvvADUXEXO3JB9dIn7nLORl8n2UjG7_-NIsrkbluukXLO81ysFs0lEP6auGvMHL",
        notification: {
          title: "Your request has already been sent",
          body: `Yay! Your request for quotation has been sent to ${findVendor.vendor_name}`,
          request_id: request._id,
          vendor_id: request.request_vendor_id,
          user_id: request.request_user_id,
          package_id: request.request_package_id._id,
        },
      },
      {
        headers: {
          Authorization: "key=" + process.env.FIREBASE_KEY,
        },
      }
    );

    const vendorNotification = await this.model("Notification").create({
      notification_title: "Request for quotation!",
      notification_body: `You have 1 request for quotation`,
      notification_forVendor: findVendor._id,
      notification_payload: {
        request_id: request._id,
        request_vendor_id: request.request_vendor_id,
        request_user_id: request.request_user_id,
        request_package_id: request.request_package_id._id,
      },
      notification_type: "request",
    });

    const pushToVendor = await axios.post(
      url,
      {
        to: "eMsJhkpIbjs4gyQN5_Eitv:APA91bG2cTShzfT7lNOkzq6nsyaQEqN91rjnZGzjlbaQP02hlRFC8rmvYYsM61520gnsB3iK80D-ajvvADUXEXO3JB9dIn7nLORl8n2UjG7_-NIsrkbluukXLO81ysFs0lEP6auGvMHL",
        notification: {
          title: "Request for quotation!",
          body: `You have 1 request for quotation`,
          request_id: request._id,
          vendor_id: request.request_vendor_id,
          user_id: request.request_user_id,
          package_id: request.request_package_id._id,
        },
      },
      {
        headers: {
          Authorization: "key=" + process.env.FIREBASE_KEY,
        },
      }
    );
  } catch (error) {
    console.error(error);
  }
};

requestSchema.virtual("quotation", {
  ref: "Quotation",
  localField: "_id",
  foreignField: "quotation_request_id",
  justOne: true,
});

requestSchema.post("save", function () {
  this.constructor.sendNotification(this);
});

// Enable soft delete, it will make delete column automaticly
requestSchema.plugin(mongooseDelete, { overrideMethods: "all" });

module.exports = mongoose.model("Request", requestSchema); // Export transaction models
