const faker = require("faker");
const {
  locations,
  sampleCapacityRanges,
  samplePriceRanges,
} = require("../config/services");
const { vendor } = require("../models");

// seeder add
async function addVendors() {
  for (let i = 0; i < 3; i++) {
    const newVendor = await vendor.create({
      vendor_name: faker.name.findName(),
      vendor_email: faker.internet.email(),
      vendor_password: "Oke12345!",
      vendor_type: "venue",
      vendor_email_info: faker.internet.email(),
      vendor_avatar: faker.image.avatar(),
      vendor_header: faker.image.nature(),
      vendor_phone: faker.phone.phoneNumber(),
      vendor_website: faker.internet.url(),
      vendor_instagram: faker.internet.url(),
      vendor_twitter: faker.internet.url(),
      vendor_facebook: faker.internet.url(),
      vendor_has_filled_info: true,
      vendor_location: locations[Math.floor(Math.random() * locations.length)],
      vendor_price_range:
        samplePriceRanges[Math.floor(Math.random() * samplePriceRanges.length)],
      vendor_capacity:
        sampleCapacityRanges[
          Math.floor(Math.random() * sampleCapacityRanges.length)
        ],
    });
  }
  for (let i = 0; i < 3; i++) {
    const newVendor = await vendor.create({
      vendor_name: faker.name.findName(),
      vendor_email: faker.internet.email(),
      vendor_password: "Oke12345!",
      vendor_type: "organizer",
      vendor_email_info: faker.internet.email(),
      vendor_avatar: faker.image.avatar(),
      vendor_header: faker.image.nature(),
      vendor_phone: faker.phone.phoneNumber(),
      vendor_website: faker.internet.url(),
      vendor_instagram: faker.internet.url(),
      vendor_twitter: faker.internet.url(),
      vendor_facebook: faker.internet.url(),
      vendor_has_filled_info: true,
      vendor_location: locations[Math.floor(Math.random() * locations.length)],
      vendor_price_range:
        samplePriceRanges[Math.floor(Math.random() * samplePriceRanges.length)],
      vendor_capacity:
        sampleCapacityRanges[
          Math.floor(Math.random() * sampleCapacityRanges.length)
        ],
    });
  }

  console.log("Vendors has been seeded");
}

async function deleteVendors() {
  await vendor.remove();
  console.log("Vendors has been deleted");
}

module.exports = {
  addVendors,
  deleteVendors,
};
