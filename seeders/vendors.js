const faker = require("faker");
const {
  locations,
  sampleCapacity,
  samplePriceRanges,
  vendorAvatars,
  vendorHeaders,
} = require("../config/services");
const { vendor } = require("../models");

// seeder add
async function addVendors() {
  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * sampleCapacity.length);

    const newVendor = await vendor.create({
      vendor_name: faker.name.findName(),
      vendor_email: faker.internet.email(),
      vendor_password: "Oke12345!",
      vendor_type: "venue",
      vendor_email_info: faker.internet.email(),
      vendor_avatar:
        vendorAvatars[Math.floor(Math.random() * vendorAvatars.length)],
      vendor_header:
        vendorHeaders[Math.floor(Math.random() * vendorHeaders.length)],
      vendor_phone: faker.phone.phoneNumber(),
      vendor_website: faker.internet.url(),
      vendor_instagram: faker.internet.url(),
      vendor_twitter: faker.internet.url(),
      vendor_facebook: faker.internet.url(),
      vendor_has_filled_info: true,
      vendor_location: locations[Math.floor(Math.random() * locations.length)],
      vendor_min_capacity: sampleCapacity[randomIndex].min,
      vendor_max_capacity: sampleCapacity[randomIndex].max,
      vendor_min_price: samplePriceRanges[randomIndex].min,
      vendor_max_price: samplePriceRanges[randomIndex].max,
      vendor_rating: Math.floor(Math.random() * (5 - 3) + 3),
    });
  }
  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * sampleCapacity.length);

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
      vendor_min_capacity: sampleCapacity[randomIndex].min,
      vendor_max_capacity: sampleCapacity[randomIndex].max,
      vendor_min_price: samplePriceRanges[randomIndex].min,
      vendor_max_price: samplePriceRanges[randomIndex].max,
      vendor_rating: Math.floor(Math.random() * (5 - 3) + 3),
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
