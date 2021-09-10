const { Todo } = require("../models"); // TODO should add vendor later

async function deleteTodos() {
  await Todo.remove();
  console.log("Todo has been deleted");
}

module.exports = {
  deleteTodos,
};
