const faker = require("faker");
const {
  venueServices,
  organizerServices,
  locations,
  samplePrices,
  sampleCapacity,
} = require("../config/services");
const { Package, vendor } = require("../models"); // TODO should add vendor later

// seeder add
async function addPackages() {
  const vendors = await vendor.find();

  for (let vendorIndex = 0; vendorIndex < vendors.length; vendorIndex++) {
    for (let i = 0; i < 3; i++) {
      let services;
      if (vendors[vendorIndex].vendor_type === "venue") {
        services = venueServices;
      } else {
        services = organizerServices;
      }

      const newPackage = await Package.create({
        package_vendor_id: vendors[vendorIndex]._id,
        package_type: vendors[vendorIndex].vendor_type,
        package_name: faker.commerce.productName(),
        package_location:
          locations[Math.floor(Math.random() * locations.length)],
        package_details: faker.lorem.words(50),
        package_price:
          samplePrices[Math.floor(Math.random() * samplePrices.length)],
        package_services: services,
        package_capacity:
          sampleCapacity[Math.floor(Math.random() * sampleCapacity.length)],
        package_album: [
          faker.image.nature(),
          faker.image.nature(),
          faker.image.nature(),
        ],
      });
    }
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
