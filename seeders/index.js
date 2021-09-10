const { add_users, delete_users } = require("./user");
const { addPackages, deletePackages } = require("./packages");
const { addVendors, deleteVendors } = require("./vendors");
const { deleteQuotations } = require("./quotations");
const { deleteRequests } = require("./requests");
const { deleteNotifications } = require("./notifications");
const { deleteTodos } = require("./todos");

async function add() {
  await add_users();
  await addVendors();
  await addPackages();
}

async function remove() {
  await Promise.all([
    deletePackages(),
    delete_users(),
    deleteVendors(),
    deleteQuotations(),
    deleteRequests(),
    deleteNotifications(),
    deleteTodos(),
  ]);
}

if (process.argv[2] === "add") {
  add().then(() => {
    console.log("Seeders success");
    process.exit(0);
  });
} else if (process.argv[2] === "remove") {
  remove().then(() => {
    console.log("Delete data success");
    process.exit(0);
  });
}
