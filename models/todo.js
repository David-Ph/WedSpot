const mongoose = require("mongoose");
const moment = require("moment");

const todoSchema = new mongoose.Schema(
  {
    todo_user_id: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "todo_user_id can't be empty"],
    },
    todo_title: {
      type: String,
      required: [true, "title cannot be empty"],
    },
    todo_due_date: {
      type: Date,
    },
    todo_notes: {
      type: String,
    },
    todo_is_done: {
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
        ret.todo_id = ret._id;
        ret.remaining_days = getRemainingDays(ret.todo_due_date);
        delete ret.id;
        delete ret._id;
        delete ret.deleted;
      },
    },
  }
);

// function to get remaining days based on todo_due_date
// and current date the todo has a GET request
function getRemainingDays(due_date) {
  const currentDate = moment(new Date()).startOf("day");
  const dueDate = moment(due_date).startOf("day");

  return dueDate.diff(currentDate, "days");
}

module.exports = mongoose.model("Todo", todoSchema); // Export transaction models
