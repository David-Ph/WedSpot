const faker = require("faker");
const { user } = require("../models");

// seeder add
async function add_users() {
  for (let i = 0; i < 3; i++) {
    await user.create({
      email: faker.internet.email(),
      password: "Oke12345!",
    });
  }
  console.log("Users has been seeded");
}

// seeder remove
async function delete_users() {
  await user.remove();
  console.log("Users has been deleted");
}

module.exports = {
  add_users,
  delete_users,
};
