const { add_users, delete_users } = require("./user");

async function add() {
  await add_users();
}

async function remove() {
  await Promise.all([deletePackages(), delete_users(), deleteVendors()]);
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
