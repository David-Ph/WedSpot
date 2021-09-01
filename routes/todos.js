const express = require("express");
const router = express.Router();

// ? import user auth
// //////////////////
const { user } = require("../middlewares/auth/user");

// ? import controllers
// ////////////////////
const TodoController = require("../controllers/todos");

// ? import validators
// ///////////////////
const {
  createTodoValidator,
  updateTodoValidator,
} = require("../middlewares/validators/todos");

// ? set routers
// /////////////
router.get("/", user, TodoController.getTodos);
router.get("/:id", user, TodoController.getTodoById);
router.post("/", user, createTodoValidator, TodoController.createTodo);
router.put("/:id", user, updateTodoValidator, TodoController.updateTodo);
router.delete("/:id", user, TodoController.deleteTodo);

// ? exports router
// ////////////////
module.exports = router;
