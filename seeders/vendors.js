const faker = require("faker");
const {
  locations,
  sampleCapacity,
  samplePriceRanges,
  vendorAvatars,
  vendorHeaders,
  weddingVenue,
  weddingOrganizer,
} = require("../config/services");
const { vendor } = require("../models");

// seeder add
async function addVendors() {
  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * sampleCapacity.length);
    const venueIndex = Math.floor(Math.random() * weddingVenue.length);

    const newVendor = await vendor.create({
      vendor_name: weddingVenue[venueIndex],
      vendor_email: faker.internet.email(),
      vendor_password: "Oke12345!",
      vendor_type: "venue",
      vendor_email_info: `${weddingVenue[venueIndex]
        .split(" ")
        .join("")}@gmail.com`,
      vendor_avatar:
        vendorAvatars[Math.floor(Math.random() * vendorAvatars.length)],
      vendor_header:
        vendorHeaders[Math.floor(Math.random() * vendorHeaders.length)],
      vendor_phone: faker.phone.phoneNumber(),
      vendor_website: `https://${weddingVenue[venueIndex]
        .split(" ")
        .join("")}.com`,
      vendor_instagram: `https://instagram.com/${weddingVenue[venueIndex]
        .split(" ")
        .join("")}`,
      vendor_twitter: `https://twitter.com/${weddingVenue[venueIndex]
        .split(" ")
        .join("")}`,
      vendor_facebook: `https://facebook.com/${weddingVenue[venueIndex]
        .split(" ")
        .join("")}`,
      vendor_has_filled_info: true,
      vendor_location: locations[Math.floor(Math.random() * locations.length)],
      vendor_min_capacity: sampleCapacity[randomIndex].min,
      vendor_max_capacity: sampleCapacity[randomIndex].max,
      vendor_min_price: samplePriceRanges[randomIndex].min,
      vendor_max_price: samplePriceRanges[randomIndex].max,
      vendor_rating: Math.floor(Math.random() * (5 - 3 + 1) + 3),
    });
  }
  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * sampleCapacity.length);
    const organizerIndex = Math.floor(Math.random() * weddingOrganizer.length);

    const newVendor = await vendor.create({
      vendor_name: weddingOrganizer[organizerIndex],
      vendor_email: faker.internet.email(),
      vendor_password: "Oke12345!",
      vendor_type: "organizer",
      vendor_email_info: `${weddingOrganizer[organizerIndex]
        .split(" ")
        .join("")}@gmail.com`,
      vendor_avatar:
        vendorAvatars[Math.floor(Math.random() * vendorAvatars.length)],
      vendor_header:
        vendorHeaders[Math.floor(Math.random() * vendorHeaders.length)],
      vendor_phone: faker.phone.phoneNumber(),
      vendor_website: `https://${weddingOrganizer[organizerIndex]
        .split(" ")
        .join("")}.com`,
      vendor_instagram: `https://instagram.com/${weddingOrganizer[
        organizerIndex
      ]
        .split(" ")
        .join("")}`,
      vendor_twitter: `https://twitter.com/${weddingOrganizer[organizerIndex]
        .split(" ")
        .join("")}`,
      vendor_facebook: `https://facebook.com/${weddingOrganizer[organizerIndex]
        .split(" ")
        .join("")}`,
      vendor_has_filled_info: true,
      vendor_location: locations[Math.floor(Math.random() * locations.length)],
      vendor_min_capacity: sampleCapacity[randomIndex].min,
      vendor_max_capacity: sampleCapacity[randomIndex].max,
      vendor_min_price: samplePriceRanges[randomIndex].min,
      vendor_max_price: samplePriceRanges[randomIndex].max,
      vendor_rating: Math.floor(Math.random() * (5 - 3 + 1) + 3),
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
