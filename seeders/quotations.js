const faker = require("faker");
const { Quotation } = require("../models"); // TODO should add vendor later

async function deleteQuotations() {
  await Quotation.remove();
  console.log("Quotations has been deleted");
}

module.exports = {
  deleteQuotations,
};
