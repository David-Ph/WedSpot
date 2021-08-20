const faker = require("faker");
const {
  venueServices,
  organizerServices,
  locations,
  samplePrices,
  sampleCapacity,
} = require("../config/services");
const { Package } = require("../models"); // TODO should add vendor later

// seeder add
async function addPackages() {
  for (let i = 0; i < 5; i++) {
    const newPackage = await Package.create({
      package_vendor_id: "610942ba3c00c02068f97e4f", // TODO should be randomly gotten from vendor later
      package_type: "venue",
      package_name: faker.commerce.productName(),
      package_location: locations[Math.floor(Math.random() * locations.length)],
      package_details: faker.lorem.words(50),
      package_price:
        samplePrices[Math.floor(Math.random() * samplePrices.length)],
      package_services: venueServices,
      package_capacity:
        sampleCapacity[Math.floor(Math.random() * sampleCapacity.length)],
      package_album: [
        faker.image.nature(),
        faker.image.nature(),
        faker.image.nature(),
      ],
    });
  }
  for (let i = 0; i < 5; i++) {
    const newPackage = await Package.create({
      package_vendor_id: "610942ba3c00c02068f97e4f", // TODO should be randomly gotten from vendor later
      package_type: "organizer",
      package_name: faker.commerce.productName(),
      package_location: locations[Math.floor(Math.random() * locations.length)],
      package_details: faker.lorem.words(50),
      package_price:
        samplePrices[Math.floor(Math.random() * samplePrices.length)],
      package_services: organizerServices,
      package_capacity:
        sampleCapacity[Math.floor(Math.random() * sampleCapacity.length)],
      package_album: [
        faker.image.nature(),
        faker.image.nature(),
        faker.image.nature(),
      ],
    });
  }
  console.log("Packages has been seeded");
}

async function deletePackages() {
  await Package.remove();
  console.log("Packages has been deleted");
}

module.exports = {
  addPackages,
  deletePackages,
};
