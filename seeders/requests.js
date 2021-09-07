const faker = require("faker");
const { Request } = require("../models"); // TODO should add vendor later

async function deleteRequests() {
  await Request.remove();
  console.log("Requests has been deleted");
}

module.exports = {
  deleteRequests,
};
