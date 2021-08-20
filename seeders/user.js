const faker = require("faker");
const { User } = require("../models");

// seeder add
async function add_users() {
  for (let i = 0; i < 3; i++) {
    await User.create({
      user_email: faker.internet.email(),
      user_password: "Oke12345!",
    });
  }
  console.log("Users has been seeded");
}

// seeder remove
async function delete_users() {
  await User.remove();
  console.log("Users has been deleted");
}

module.exports = {
  add_users,
  delete_users,
};
