const { User, Todo } = require("../../models");
const validator = require("validator");
const moment = require("moment");

exports.createTodoValidator = async (req, res, next) => {
  try {
    const errorMessages = [];

    if (
      req.body.todo_due_date &&
      !validator.isAfter(req.body.todo_due_date.toString())
    ) {
      errorMessages.push(
        "Invalid due date. Please input date after today in a proper format (YYYY-MM-DD"
      );
    }

    if (!req.body.todo_due_date) {
      req.body.todo_due_date = moment().add(1, "weeks").endOf("days");
    }

    if (req.body.todo_is_done) {
      req.body.todo_is_done = false;
    }

    req.body.todo_user_id = req.user.user;

    if (errorMessages.length > 0) {
      return next({ statusCode: 400, messages: errorMessages });
    }
    next();
  } catch (error) {
    next(error);
  }
};

exports.updateTodoValidator = async (req, res, next) => {
  try {
    const errorMessages = [];

    if (
      req.body.todo_due_date &&
      !validator.isAfter(req.body.todo_due_date.toString())
    ) {
      errorMessages.push(
        "Invalid due date. Please input date after today in a proper format(YYYY-MM-DD)"
      );
    }

    if (
      req.body.todo_is_done &&
      !validator.isBoolean(req.body.todo_is_done.toString())
    ) {
      errorMessages.push("Invalid todo_is_done. Has to be boolean");
    }

    const findTodo = await Todo.findOne({ _id: req.params.id });

    if (findTodo && findTodo.todo_user_id != req.user.user) {
      return next({ statusCode: 403, message: "Forbidden access" });
    }

    if (errorMessages.length > 0) {
      return next({ statusCode: 400, messages: errorMessages });
    }
    next();
  } catch (error) {
    next(error);
  }
};
