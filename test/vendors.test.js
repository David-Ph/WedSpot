// const request = require("supertest");
// const faker = require("faker");
// const jwt = require("jsonwebtoken");
// const app = require("../app");
// const { Package, User, vendor } = require("../models");
// let vendorData = [];
// let customerToken = "";
// let vendorToken = "";
// let vendor;

// beforeAll(async () => {
//   vendorData = await vendor.find();
//   // create vendor

//   const theVendor = await vendor.create({
//     vendor_name: faker.name.findName(),
//     user_email: "unittest@email.com",
//     user_password: "Oke12345!",
//   });

//   // create a token based off that customer or vendor
//   vendorToken = jwt.sign({ vendor: theVendor._id }, process.env.JWT_SECRET);
// });

// describe("Vendor Register", () => {
//   it("register success", async () => {
//     const res = await request(app).post("/vendors/register").send({
//       vendor_name: faker.name.findName(),
//       vendor_email: faker.internet.email(),
//       vendor_password: "Oke12345!",
//     });
//     expect(res.statusCode).toEqual(200);
//     expect(res.body).toBeInstanceOf(Object);
//   });

//   it("Empty email", async () => {
//     const res = await request(app).post("/vendors/register").send({
//       vendor_name: faker.name.findName(),
//       vendor_email: "",
//       vendor_password: "Oke12345!",
//     });
//     expect(res.statusCode).toEqual(401);
//     expect(res.body).toBeInstanceOf(Object);
//   });

//   it("Empty name", async () => {
//     const res = await request(app).post("/vendors/register").send({
//       vendor_name: "",
//       vendor_email: faker.internet.email(),
//       vendor_password: "Oke12345!",
//     });
//     expect(res.statusCode).toEqual(400);
//     expect(res.body).toBeInstanceOf(Object);
//   });

//   it("Empty password", async () => {
//     const res = await request(app).post("/vendors/register").send({
//       vendor_name: faker.name.findName(),
//       vendor_email: faker.internet.email(),
//       vendor_password: "",
//     });
//     expect(res.statusCode).toEqual(401);
//     expect(res.body).toBeInstanceOf(Object);
//   });

//   it("Weak password", async () => {
//     const res = await request(app).post("/vendors/register").send({
//       vendor_name: faker.name.findName(),
//       vendor_email: faker.internet.email(),
//       vendor_password: "kirainbisa",
//     });
//     expect(res.statusCode).toEqual(400);
//     expect(res.body).toBeInstanceOf(Object);
//   });

//   it("Email format not valid", async () => {
//     const res = await request(app).post("/vendors/register").send({
//       vendor_name: faker.name.findName(),
//       vendor_email: "kirainbisa",
//       vendor_password: "Oke12345!",
//     });
//     expect(res.statusCode).toEqual(400);
//     expect(res.body).toBeInstanceOf(Object);
//   });

//   it("Duplicate Email", async () => {
//     const res = await request(app).post("/vendors/register").send({
//       vendor_name: faker.name.findName(),
//       vendor_email: vendorData[0].email,
//       vendor_password: "Oke12345!",
//     });
//     expect(res.statusCode).toEqual(401);
//     expect(res.body).toBeInstanceOf(Object);
//   });

//   describe("Vendor login", () => {
//     it("Login success", async () => {
//       const res = await request(app).post("/vendors/login").send({
//         vendor_email: "unittest@email.com",
//         vendor_password: "Oke12345!",
//       });
//       expect(res.statusCode).toEqual(200);
//       expect(res.body).toBeInstanceOf(Object);
//     });

//     it("Wrong email", async () => {
//       const res = await request(app).post("/vendors/login").send({
//         vendor_email: "wrongemailtologin",
//         vendor_password: "Oke12345!",
//       });
//       expect(res.statusCode).toEqual(401);
//       expect(res.body).toBeInstanceOf(Object);
//     });

//     it("Empty email", async () => {
//       const res = await request(app).post("/vendors/login").send({
//         vendor_email: "",
//         vendor_password: "Oke12345!",
//       });
//       expect(res.statusCode).toEqual(401);
//       expect(res.body).toBeInstanceOf(Object);
//     });

//     it("Wrong password", async () => {
//       const res = await request(app).post("/vendors/login").send({
//         vendor_email: "unittest@email.com",
//         vendor_password: "Oke123",
//       });
//       expect(res.statusCode).toEqual(400);
//       expect(res.body).toBeInstanceOf(Object);
//     });
//   });

//   it("Empty password", async () => {
//     const res = await request(app).post("/vendors/login").send({
//       vendor_email: "unittest@email.com",
//       vendor_password: "",
//     });
//     expect(res.statusCode).toEqual(401);
//     expect(res.body).toBeInstanceOf(Object);
//   });

//   describe("PUT /vendors", () => {
//     it("Vendor has been successfully updated", async () => {
//       const findVendor = await vendor.find({
//         vendor_id: vendor._id,
//       });

//       const response = await request(app)
//         .put(`/vendors/edit`)
//         .set("Authorization", `Bearer ${vendorToken}`) // set the token in the test
//         .send({
//           vendor_header:
//             "https://images.unsplash.com/photo-1525441273400-056e9c7517b3?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHx8d2VkZGluZ3x8fHx8fDE2MzAxMzg4NzI&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=960",
//           vendor_avatar:
//             "https://images.unsplash.com/photo-1515923019249-6b544314450f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=360&ixid=MnwxfDB8MXxyYW5kb218MHx8d2VkZGluZ3x8fHx8fDE2MzAxMzg3NTc&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=360",
//           vendor_name: "Bukit Mantun",
//           vendor_email_info: "MantunBukit@email.com",
//           vendor_facebook: "http://www.facebook.com/BukitMantun",
//           vendor_instagram: "http://www.instagram.com/BukitMantun",
//           vendor_location: "pyongyang",
//           vendor_capacity: "500-15000",
//           vendor_price_range: "90000000-1500000000",
//           vendor_phone: "082399229922",
//           vendor_twitter: "http://www.twitter.com/BukitMantun",
//           vendor_type: "venue",
//           vendor_website: "http://www.BukitMantun.com",
//           vendor_rating: 5,
//         });

//       expect(response.statusCode).toEqual(201);
//       expect(response.body).toBeInstanceOf(Object);
//     });

//     it("invalid email", async () => {
//       const findVendor = await vendor.find({
//         vendor_id: vendor._id,
//       });

//       const response = await request(app)
//         .put(`/vendors/edit`)
//         .set("Authorization", `Bearer ${vendorToken}`) // set the token in the test
//         .send({
//           vendor_header:
//             "https://images.unsplash.com/photo-1525441273400-056e9c7517b3?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHx8d2VkZGluZ3x8fHx8fDE2MzAxMzg4NzI&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=960",
//           vendor_avatar:
//             "https://images.unsplash.com/photo-1515923019249-6b544314450f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=360&ixid=MnwxfDB8MXxyYW5kb218MHx8d2VkZGluZ3x8fHx8fDE2MzAxMzg3NTc&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=360",
//           vendor_name: "Bukit Mantun",
//           vendor_email_info: "MantunBukit",
//           vendor_facebook: "http://www.facebook.com/BukitMantun",
//           vendor_instagram: "http://www.instagram.com/BukitMantun",
//           vendor_location: "pyongyang",
//           vendor_capacity: "500-15000",
//           vendor_price_range: "90000000-1500000000",
//           vendor_phone: "082399229922",
//           vendor_twitter: "http://www.twitter.com/BukitMantun",
//           vendor_type: "venue",
//           vendor_website: "http://www.BukitMantun.com",
//           vendor_rating: 5,
//         });

//       expect(response.statusCode).toEqual(400);
//       expect(response.body).toBeInstanceOf(Object);
//     });

//     it("Invalid facebook account", async () => {
//       const findVendor = await vendor.find({
//         vendor_id: vendor._id,
//       });

//       const response = await request(app)
//         .put(`/vendors/edit`)
//         .set("Authorization", `Bearer ${vendorToken}`) // set the token in the test
//         .send({
//           vendor_header:
//             "https://images.unsplash.com/photo-1525441273400-056e9c7517b3?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHx8d2VkZGluZ3x8fHx8fDE2MzAxMzg4NzI&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=960",
//           vendor_avatar:
//             "https://images.unsplash.com/photo-1515923019249-6b544314450f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=360&ixid=MnwxfDB8MXxyYW5kb218MHx8d2VkZGluZ3x8fHx8fDE2MzAxMzg3NTc&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=360",
//           vendor_name: "Bukit Mantun",
//           vendor_email_info: "MantunBukit@email.com",
//           vendor_facebook: "BukitMantunwrongaccount",
//           vendor_instagram: "http://www.instagram.com/BukitMantun",
//           vendor_location: "pyongyang",
//           vendor_capacity: "500-15000",
//           vendor_price_range: "90000000-1500000000",
//           vendor_phone: "082399229922",
//           vendor_twitter: "http://www.twitter.com/BukitMantun",
//           vendor_type: "venue",
//           vendor_website: "http://www.BukitMantun.com",
//           vendor_rating: 5,
//         });

//       expect(response.statusCode).toEqual(400);
//       expect(response.body).toBeInstanceOf(Object);
//     });

//     it("Invalid instagram account", async () => {
//       const findVendor = await vendor.find({
//         vendor_id: vendor._id,
//       });

//       const response = await request(app)
//         .put(`/vendors/edit`)
//         .set("Authorization", `Bearer ${vendorToken}`) // set the token in the test
//         .send({
//           vendor_header:
//             "https://images.unsplash.com/photo-1525441273400-056e9c7517b3?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHx8d2VkZGluZ3x8fHx8fDE2MzAxMzg4NzI&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=960",
//           vendor_avatar:
//             "https://images.unsplash.com/photo-1515923019249-6b544314450f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=360&ixid=MnwxfDB8MXxyYW5kb218MHx8d2VkZGluZ3x8fHx8fDE2MzAxMzg3NTc&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=360",
//           vendor_name: "Bukit Mantun",
//           vendor_email_info: "MantunBukit@email.com",
//           vendor_facebook: "http://www.facebook.com/BukitMantun",
//           vendor_instagram: "BukitMantunwrongaccount",
//           vendor_location: "pyongyang",
//           vendor_capacity: "500-15000",
//           vendor_price_range: "90000000-1500000000",
//           vendor_phone: "082399229922",
//           vendor_twitter: "http://www.twitter.com/BukitMantun",
//           vendor_type: "venue",
//           vendor_website: "http://www.BukitMantun.com",
//           vendor_rating: 5,
//         });

//       expect(response.statusCode).toEqual(400);
//       expect(response.body).toBeInstanceOf(Object);
//     });

//     it("Invalid location", async () => {
//       const findVendor = await vendor.find({
//         vendor_id: vendor._id,
//       });

//       const response = await request(app)
//         .put(`/vendors/edit`)
//         .set("Authorization", `Bearer ${vendorToken}`) // set the token in the test
//         .send({
//           vendor_header:
//             "https://images.unsplash.com/photo-1525441273400-056e9c7517b3?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHx8d2VkZGluZ3x8fHx8fDE2MzAxMzg4NzI&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=960",
//           vendor_avatar:
//             "https://images.unsplash.com/photo-1515923019249-6b544314450f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=360&ixid=MnwxfDB8MXxyYW5kb218MHx8d2VkZGluZ3x8fHx8fDE2MzAxMzg3NTc&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=360",
//           vendor_name: "Bukit Mantun",
//           vendor_email_info: "MantunBukit@email.com",
//           vendor_facebook: "http://www.facebook.com/BukitMantun",
//           vendor_instagram: "http://www.instagram.com/BukitMantun",
//           vendor_location: "sumbawa",
//           vendor_capacity: "500-15000",
//           vendor_price_range: "90000000-1500000000",
//           vendor_phone: "082399229922",
//           vendor_twitter: "http://www.twitter.com/BukitMantun",
//           vendor_type: "venue",
//           vendor_website: "http://www.BukitMantun.com",
//           vendor_rating: 5,
//         });

//       expect(response.statusCode).toEqual(400);
//       expect(response.body).toBeInstanceOf(Object);
//     });

//     it("Invalid phone number", async () => {
//       const findVendor = await vendor.find({
//         vendor_id: vendor._id,
//       });

//       const response = await request(app)
//         .put(`/vendors/edit`)
//         .set("Authorization", `Bearer ${vendorToken}`) // set the token in the test
//         .send({
//           vendor_header:
//             "https://images.unsplash.com/photo-1525441273400-056e9c7517b3?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHx8d2VkZGluZ3x8fHx8fDE2MzAxMzg4NzI&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=960",
//           vendor_avatar:
//             "https://images.unsplash.com/photo-1515923019249-6b544314450f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=360&ixid=MnwxfDB8MXxyYW5kb218MHx8d2VkZGluZ3x8fHx8fDE2MzAxMzg3NTc&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=360",
//           vendor_name: "Bukit Mantun",
//           vendor_email_info: "MantunBukit@email.com",
//           vendor_facebook: "http://www.facebook.com/BukitMantun",
//           vendor_instagram: "http://www.instagram.com/BukitMantun",
//           vendor_location: "pyongyang",
//           vendor_capacity: "500-15000",
//           vendor_price_range: "90000000-1500000000",
//           vendor_phone: "0823992299225667788989889",
//           vendor_twitter: "http://www.twitter.com/BukitMantun",
//           vendor_type: "venue",
//           vendor_website: "http://www.BukitMantun.com",
//           vendor_rating: 5,
//         });

//       expect(response.statusCode).toEqual(400);
//       expect(response.body).toBeInstanceOf(Object);
//     });

//     it("Invalid twitter account", async () => {
//       const findVendor = await vendor.find({
//         vendor_id: vendor._id,
//       });

//       const response = await request(app)
//         .put(`/vendors/edit`)
//         .set("Authorization", `Bearer ${vendorToken}`) // set the token in the test
//         .send({
//           vendor_header:
//             "https://images.unsplash.com/photo-1525441273400-056e9c7517b3?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHx8d2VkZGluZ3x8fHx8fDE2MzAxMzg4NzI&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=960",
//           vendor_avatar:
//             "https://images.unsplash.com/photo-1515923019249-6b544314450f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=360&ixid=MnwxfDB8MXxyYW5kb218MHx8d2VkZGluZ3x8fHx8fDE2MzAxMzg3NTc&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=360",
//           vendor_name: "Bukit Mantun",
//           vendor_email_info: "MantunBukit@email.com",
//           vendor_facebook: "http://www.facebook.com/BukitMantun",
//           vendor_instagram: "http://www.instagram.com/BukitMantun",
//           vendor_location: "pyongyang",
//           vendor_capacity: "500-15000",
//           vendor_price_range: "90000000-1500000000",
//           vendor_phone: "082399229922",
//           vendor_twitter: "BukitMantun",
//           vendor_type: "venue",
//           vendor_website: "http://www.BukitMantun.com",
//           vendor_rating: 5,
//         });

//       expect(response.statusCode).toEqual(400);
//       expect(response.body).toBeInstanceOf(Object);
//     });

//     it("Invalid website address", async () => {
//       const findVendor = await vendor.find({
//         vendor_id: vendor._id,
//       });

//       const response = await request(app)
//         .put(`/vendors/edit`)
//         .set("Authorization", `Bearer ${vendorToken}`) // set the token in the test
//         .send({
//           vendor_header:
//             "https://images.unsplash.com/photo-1525441273400-056e9c7517b3?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHx8d2VkZGluZ3x8fHx8fDE2MzAxMzg4NzI&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=960",
//           vendor_avatar:
//             "https://images.unsplash.com/photo-1515923019249-6b544314450f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=360&ixid=MnwxfDB8MXxyYW5kb218MHx8d2VkZGluZ3x8fHx8fDE2MzAxMzg3NTc&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=360",
//           vendor_name: "Bukit Mantun",
//           vendor_email_info: "MantunBukit@email.com",
//           vendor_facebook: "http://www.facebook.com/BukitMantun",
//           vendor_instagram: "http://www.instagram.com/BukitMantun",
//           vendor_location: "pyongyang",
//           vendor_capacity: "500-15000",
//           vendor_price_range: "90000000-1500000000",
//           vendor_phone: "082399229922",
//           vendor_twitter: "http://www.twitter.com/BukitMantun",
//           vendor_type: "venue",
//           vendor_website: "BukitMantunwrongwebsiteadress",
//           vendor_rating: 5,
//         });

//       expect(response.statusCode).toEqual(400);
//       expect(response.body).toBeInstanceOf(Object);
//     });

//     it("Invalid price range", async () => {
//       const findVendor = await vendor.find({
//         vendor_id: vendor._id,
//       });

//       const response = await request(app)
//         .put(`/vendors/edit`)
//         .set("Authorization", `Bearer ${vendorToken}`) // set the token in the test
//         .send({
//           vendor_header:
//             "https://images.unsplash.com/photo-1525441273400-056e9c7517b3?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHx8d2VkZGluZ3x8fHx8fDE2MzAxMzg4NzI&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=960",
//           vendor_avatar:
//             "https://images.unsplash.com/photo-1515923019249-6b544314450f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=360&ixid=MnwxfDB8MXxyYW5kb218MHx8d2VkZGluZ3x8fHx8fDE2MzAxMzg3NTc&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=360",
//           vendor_name: "Bukit Mantun",
//           vendor_email_info: "MantunBukit@email.com",
//           vendor_facebook: "http://www.facebook.com/BukitMantun",
//           vendor_instagram: "http://www.instagram.com/BukitMantun",
//           vendor_location: "pyongyang",
//           vendor_capacity: "500-15000",
//           vendor_price_range: "1500000000wrong",
//           vendor_phone: "082399229922",
//           vendor_twitter: "http://www.twitter.com/BukitMantun",
//           vendor_type: "venue",
//           vendor_website: "http://www.BukitMantun.com",
//           vendor_rating: 5,
//         });

//       expect(response.statusCode).toEqual(400);
//       expect(response.body).toBeInstanceOf(Object);
//     });

//     it("Invalid capacity", async () => {
//       const findVendor = await vendor.find({
//         vendor_id: vendor._id,
//       });

//       const response = await request(app)
//         .put(`/vendors/edit`)
//         .set("Authorization", `Bearer ${vendorToken}`) // set the token in the test
//         .send({
//           vendor_header:
//             "https://images.unsplash.com/photo-1525441273400-056e9c7517b3?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHx8d2VkZGluZ3x8fHx8fDE2MzAxMzg4NzI&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=960",
//           vendor_avatar:
//             "https://images.unsplash.com/photo-1515923019249-6b544314450f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=360&ixid=MnwxfDB8MXxyYW5kb218MHx8d2VkZGluZ3x8fHx8fDE2MzAxMzg3NTc&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=360",
//           vendor_name: "Bukit Mantun",
//           vendor_email_info: "MantunBukit@email.com",
//           vendor_facebook: "http://www.facebook.com/BukitMantun",
//           vendor_instagram: "http://www.instagram.com/BukitMantun",
//           vendor_location: "pyongyang",
//           vendor_capacity: "500wrongcapacity",
//           vendor_price_range: "90000000-1500000000",
//           vendor_phone: "082399229922",
//           vendor_twitter: "http://www.twitter.com/BukitMantun",
//           vendor_type: "venue",
//           vendor_website: "http://www.BukitMantun.com",
//           vendor_rating: 5,
//         });

//       expect(response.statusCode).toEqual(400);
//       expect(response.body).toBeInstanceOf(Object);
//     });

//     it("Invalid vendor type", async () => {
//       const findVendor = await vendor.find({
//         vendor_id: vendor._id,
//       });

//       const response = await request(app)
//         .put(`/vendors/edit`)
//         .set("Authorization", `Bearer ${vendorToken}`) // set the token in the test
//         .send({
//           vendor_header:
//             "https://images.unsplash.com/photo-1525441273400-056e9c7517b3?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHx8d2VkZGluZ3x8fHx8fDE2MzAxMzg4NzI&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=960",
//           vendor_avatar:
//             "https://images.unsplash.com/photo-1515923019249-6b544314450f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=360&ixid=MnwxfDB8MXxyYW5kb218MHx8d2VkZGluZ3x8fHx8fDE2MzAxMzg3NTc&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=360",
//           vendor_name: "Bukit Mantun",
//           vendor_email_info: "MantunBukit@email.com",
//           vendor_facebook: "http://www.facebook.com/BukitMantun",
//           vendor_instagram: "http://www.instagram.com/BukitMantun",
//           vendor_location: "pyongyang",
//           vendor_capacity: "500-15000",
//           vendor_price_range: "90000000-1500000000",
//           vendor_phone: "082399229922",
//           vendor_twitter: "http://www.twitter.com/BukitMantun",
//           vendor_type: "wrongtype",
//           vendor_website: "http://www.BukitMantun.com",
//           vendor_rating: 5,
//         });

//       expect(response.statusCode).toEqual(500);
//       expect(response.body).toBeInstanceOf(Object);
//     });

//     it("Invalid vendor rating", async () => {
//       const findVendor = await vendor.find({
//         vendor_id: vendor._id,
//       });

//       const response = await request(app)
//         .put(`/vendors/edit`)
//         .set("Authorization", `Bearer ${vendorToken}`) // set the token in the test
//         .send({
//           vendor_header:
//             "https://images.unsplash.com/photo-1525441273400-056e9c7517b3?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHx8d2VkZGluZ3x8fHx8fDE2MzAxMzg4NzI&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=960",
//           vendor_avatar:
//             "https://images.unsplash.com/photo-1515923019249-6b544314450f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=360&ixid=MnwxfDB8MXxyYW5kb218MHx8d2VkZGluZ3x8fHx8fDE2MzAxMzg3NTc&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=360",
//           vendor_name: "Bukit Mantun",
//           vendor_email_info: "MantunBukit@email.com",
//           vendor_facebook: "http://www.facebook.com/BukitMantun",
//           vendor_instagram: "http://www.instagram.com/BukitMantun",
//           vendor_location: "pyongyang",
//           vendor_capacity: "500-15000",
//           vendor_price_range: "90000000-1500000000",
//           vendor_phone: "082399229922",
//           vendor_twitter: "http://www.twitter.com/BukitMantun",
//           vendor_type: "venue",
//           vendor_website: "http://www.BukitMantun.com",
//           vendor_rating: "wrongrating",
//         });

//       expect(response.statusCode).toEqual(400);
//       expect(response.body).toBeInstanceOf(Object);
//     });

//     describe("GET /vendors", () => {
//       it("Get all vendors", async () => {
//         const response = await request(app).get("/vendors");

//         expect(response.statusCode).toEqual(200);
//         expect(response.body).toBeInstanceOf(Object);
//       });

//       it("Get vendors count", async () => {
//         const response = await request(app).get("/vendors/count");

//         expect(response.statusCode).toEqual(200);
//         expect(response.body).toBeInstanceOf(Object);
//       });

//       it("Get all vendors with filter", async () => {
//         const response = await request(app).get(
//           "/vendors?page=1&limit=5&min_capacity=0&max_capacity=3000&min_price=0&max_price=100000000&location=bandung&location=jakarta&location=batam&location=malang&location=pyongyang&type=venue&type=organizer&search=a"
//         );

//         expect(response.statusCode).toEqual(200);
//         expect(response.body).toBeInstanceOf(Object);
//       });

//       it("Get vendors invalid query", async () => {
//         const response = await request(app).get("/vendors?page=asd&limit=asd");

//         expect(response.statusCode).toEqual(400);
//         expect(response.body).toBeInstanceOf(Object);
//       });

//       it("Get all vendors not found", async () => {
//         const response = await request(app).get(
//           "/vendors?page=1&limit=5&location=notacity"
//         );

//         expect(response.statusCode).toEqual(404);
//         expect(response.body).toBeInstanceOf(Object);
//       });

//       it("Get vendor by id", async () => {
//         const response = await request(app).get(
//           `/vendors/${vendorData[0]._id}`
//         );

//         expect(response.statusCode).toEqual(200);
//         expect(response.body).toBeInstanceOf(Object);
//       });
//       it("Get vendor by id not found", async () => {
//         const response = await request(app).get(
//           `/vendors/61248b5ad302b53b72363705`
//         );

//         expect(response.statusCode).toEqual(404);
//         expect(response.body).toBeInstanceOf(Object);
//       });
//     });

//     describe("Get current vendor", () => {
//       it("get my profile success", async () => {
//         const res = await request(app)
//           .get("/vendors/getMe")
//           .set("Authorization", `Bearer ${vendors_token}`);
//         expect(res.statusCode).toEqual(200);
//         expect(res.body).toBeInstanceOf(Object);
//       });

//       it("No vendor logged in and should fail", async () => {
//         const res = await request(app)
//           .get("/vendors/getMe")
//           .set("Authorization", `Bearer No user login`);
//         expect(res.statusCode).toEqual(403);
//         expect(res.body).toBeInstanceOf(Object);
//       });
//     });
//   });

//   describe("GET /config", () => {
//     it("Get venue services", async () => {
//       const response = await request(app).get("/config/venue");

//       expect(response.statusCode).toEqual(200);
//       expect(response.body).toBeInstanceOf(Object);
//     });

//     it("Get organizer services", async () => {
//       const response = await request(app).get("/config/organizer");

//       expect(response.statusCode).toEqual(200);
//       expect(response.body).toBeInstanceOf(Object);
//     });

//     it("Get location services", async () => {
//       const response = await request(app).get("/config/locations");

//       expect(response.statusCode).toEqual(200);
//       expect(response.body).toBeInstanceOf(Object);
//     });
//   });
// });
