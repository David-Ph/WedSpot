const request = require("supertest");
const faker = require("faker");
const jwt = require("jsonwebtoken");
const app = require("../app");
const {
  venueServices,
  organizerServices,
  locations,
} = require("../config/services");
const { Package, User, vendor } = require("../models");
let packageData = [];
let customerToken = "";
let vendorToken = "";
let customer;
let venueVendor;

beforeAll(async () => {
  packageData = await Package.find();
  // create user and admin
  customer = await User.create({
    user_fullname: faker.name.findName(),
    user_email: faker.internet.email(),
    user_password: "Aneh123!!",
  });

  venueVendor = await vendor.create({
    vendor_name: faker.name.findName(),
    vendor_email: faker.internet.email(),
    vendor_password: "Aneh123!!",
    vendor_type: "venue",
  });

  // create a token based off that customer or vendor
  customerToken = jwt.sign({ user: customer._id }, process.env.JWT_SECRET);
  vendorToken = jwt.sign({ user: venueVendor._id }, process.env.JWT_SECRET);
});

describe("POST /packages", () => {
  it("Create package should succeed", async () => {
    const response = await request(app)
      .post("/packages")
      .set("Authorization", `Bearer ${vendorToken}`) // set the token in the test
      .send({
        package_name: "Good Package",
        package_location: "jakarta",
        package_details: "Good details",
        package_price: "25000000",
        package_services: ["electricity", "cleaning service"],
        package_capacity: "50-250",
      });

    expect(response.statusCode).toEqual(201);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Create package invalid inputs", async () => {
    const response = await request(app)
      .post("/packages")
      .set("Authorization", `Bearer ${vendorToken}`) // set the token in the test
      .send({
        package_name: "Good Package",
        package_location: "invalid city",
        package_details: "Good details",
        package_price: "invalid price",
        package_services: ["invalid service", "invalid service"],
        package_capacity: "invalid capacity",
      });

    expect(response.statusCode).toEqual(400);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Save package to draft", async () => {
    const response = await request(app)
      .post("/packages")
      .set("Authorization", `Bearer ${vendorToken}`) // set the token in the test
      .send({
        package_name: "Good Package",
        package_location: "jakarta",
        package_details: "Good details",
        package_price: "25000000",
        package_services: ["electricity", "cleaning service"],
        package_capacity: "50-250",
        package_status: "draft",
      });

    expect(response.statusCode).toEqual(201);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Create package no auth token", async () => {
    const response = await request(app)
      .post("/packages")
      .send({
        package_name: "Good Package",
        package_location: "jakarta",
        package_details: "Good details",
        package_price: "25000000",
        package_services: ["electricity", "cleaning service"],
        package_capacity: "50-250",
        package_status: "draft",
      });

    expect(response.statusCode).toEqual(403);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("User should not be able to create package", async () => {
    const response = await request(app)
      .post("/packages")
      .set("Authorization", `Bearer ${customerToken}`)
      .send({
        package_name: "Good Package",
        package_location: "jakarta",
        package_details: "Good details",
        package_price: "25000000",
        package_services: ["electricity", "cleaning service"],
        package_capacity: "50-250",
        package_status: "draft",
      });

    expect(response.statusCode).toEqual(403);
    expect(response.body).toBeInstanceOf(Object);
  });
  //         .attach("image", Buffer.alloc(150), "image.png")
});

describe("GET /packages", () => {
  it("Get all packages", async () => {
    const response = await request(app).get("/packages");

    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Get all packages with filter", async () => {
    const response = await request(app).get(
      "/packages?page=1&limit=5&min_capacity=0&max_capacity=3000&min_price=0&max_price=100000000&location=bandung&location=jakarta&location=batam&location=malang&location=pyongyang&type=venue&type=organizer"
    );

    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Get packages invalid query", async () => {
    const response = await request(app).get("/packages?page=asd&limit=asd");

    expect(response.statusCode).toEqual(400);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Get all packages not found", async () => {
    const response = await request(app).get(
      "/packages?page=1&limit=5&location=notacity"
    );

    expect(response.statusCode).toEqual(404);
    expect(response.body).toBeInstanceOf(Object);
  });

  // /packages/vendor
});

describe("GET /packages", () => {
  // TODO UNCOMMENT THIS AFTER

  it("Get all packages for vendors", async () => {
    const response = await request(app)
      .get("/packages/vendor")
      .set("Authorization", `Bearer ${vendorToken}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Get all packages for vendors should be forbidden access for user", async () => {
    const response = await request(app)
      .get("/packages/vendor")
      .set("Authorization", `Bearer ${customerToken}`);

    expect(response.statusCode).toEqual(403);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Get all packages for vendors should fail with no auth token", async () => {
    const response = await request(app).get("/packages/vendor");

    expect(response.statusCode).toEqual(403);
    expect(response.body).toBeInstanceOf(Object);
  });
});

describe("PUT /packages", () => {
  it("package must be updated", async () => {
    const findPackage = await Package.find({
      package_vendor_id: venueVendor._id,
    });

    const response = await request(app)
      .put(`/packages/${findPackage[0]._id}`)
      .set("Authorization", `Bearer ${vendorToken}`) // set the token in the test
      .send({
        package_name: "Good Package",
        package_location: "jakarta",
        package_details: "Good details",
        package_price: "25000000",
        package_services: ["electricity", "cleaning service"],
        package_capacity: "50-250",
        package_status: "draft",
      });

    expect(response.statusCode).toEqual(201);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("upload package_album", async () => {
    const findPackage = await Package.find({
      package_vendor_id: venueVendor._id,
    });

    const response = await request(app)
      .put(`/packages/${findPackage[0]._id}`)
      .set("Authorization", `Bearer ${vendorToken}`) // set the token in the test
      .attach("package_album", "./config/Glints-logo.jpeg");

    expect(response.statusCode).toEqual(201);
    expect(response.body).toBeInstanceOf(Object);
  });
});

// describe("/movies DELETE", () => {
//   it("Movies must be deleted", async () => {
//     const randomMovieId = data[0][data[0].length - 5]._id;
//     const response = await request(app)
//       .delete(`/movies/${randomMovieId}`)
//       .set("Authorization", `Bearer ${adminToken}`); // set the token in the test

//     expect(response.statusCode).toEqual(200);
//     expect(response.body).toBeInstanceOf(Object);
//   });

// });

// describe("/categories GET", () => {
//   it("Must get all categories", async () => {
//     const response = await request(app).get(`/movies/categories/all`);

//     expect(response.statusCode).toEqual(200);
//     expect(response.body).toBeInstanceOf(Object);
//   });
// });
