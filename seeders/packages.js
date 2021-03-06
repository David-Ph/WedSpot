const faker = require("faker");
const {
  venueServices,
  organizerServices,
  locations,
  samplePrices,
  sampleCapacity,
  packageAlbums,
  weddingPackages,
  packageDetails,
} = require("../config/services");
const { Package, vendor } = require("../models"); // TODO should add vendor later

// seeder add
async function addPackages() {
  const vendors = await vendor.find();

  for (let vendorIndex = 0; vendorIndex < vendors.length; vendorIndex++) {
    for (let i = 0; i < 6; i++) {
      let services;
      if (vendors[vendorIndex].vendor_type === "venue") {
        services = venueServices;
      } else {
        services = organizerServices;
      }

      const randomIndex = Math.floor(Math.random() * sampleCapacity.length);
      const packageIndex = Math.floor(Math.random() * weddingPackages.length);
      const detailsIndex = Math.floor(Math.random() * packageDetails.length);

      const newPackage = await Package.create({
        package_vendor_id: vendors[vendorIndex]._id,
        package_type: vendors[vendorIndex].vendor_type,
        package_name: `${vendors[vendorIndex].vendor_name} ${weddingPackages[packageIndex]}`,
        package_location:
          locations[Math.floor(Math.random() * locations.length)],
        package_details: packageDetails[detailsIndex],
        package_price:
          samplePrices[Math.floor(Math.random() * samplePrices.length)],
        package_services: services,
        package_min_capacity: sampleCapacity[randomIndex].min,
        package_max_capacity: sampleCapacity[randomIndex].max,
        package_album: [
          packageAlbums[Math.floor(Math.random() * packageAlbums.length)],
          packageAlbums[Math.floor(Math.random() * packageAlbums.length)],
          packageAlbums[Math.floor(Math.random() * packageAlbums.length)],
          packageAlbums[Math.floor(Math.random() * packageAlbums.length)],
          packageAlbums[Math.floor(Math.random() * packageAlbums.length)],
          packageAlbums[Math.floor(Math.random() * packageAlbums.length)],
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
