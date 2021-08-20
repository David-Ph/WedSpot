const { add_users, delete_users } = require("./user");
const { addPackages, deletePackages } = require("./packages");

async function add() {
  await add_users();
  await addPackages();
}

async function remove() {
  await delete_users();
  await deletePackages();
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
