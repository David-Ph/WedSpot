const { Todo } = require("../models");

class TodoController {
  async getTodos(req, res, next) {
    try {
      const data = await Todo.find({
        todo_user_id: req.user.user,
      });

      if (data.length === 0) {
        return next({ statusCode: 404, message: "Todo not found" });
      }

      res.status(200).json({ data, count: data.length });
    } catch (error) {
      next(error);
    }
  }

  async getTodoById(req, res, next) {
    try {
      const data = await Todo.findOne({
        _id: req.params.id,
      });

      if (!data) {
        return next({ statusCode: 404, message: "Todo not found" });
      }

      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }

  async createTodo(req, res, next) {
    try {
      const newData = await Todo.create(req.body);

      const data = await Todo.find({
        _id: newData.id,
      });

      res.status(201).json({ data, message: "New todo created!" });
    } catch (error) {
      next(error);
    }
  }

  async updateTodo(req, res, next) {
    try {
      const data = await Todo.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      );

      if (!data) {
        return next({ statusCode: 404, message: "Todo not found!" });
      }

      res.status(201).json({ data, message: "Todo updated!" });
    } catch (error) {
      next(error);
    }
  }

  async deleteTodo(req, res, next) {
    try {
      const data = await Todo.deleteOne({ _id: req.params.id });

      if (data.n === 0) {
        return next({ statusCode: 404, message: "Todo not found!" });
      }

      console.log(data);

      res.status(200).json({ message: "Successfully deleted" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new TodoController();
