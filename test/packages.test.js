const request = require("supertest");
const faker = require("faker");
const jwt = require("jsonwebtoken");
const app = require("../app");
const { Package, User, vendor, Request } = require("../models");
let packageData = [];
let customerToken = "";
let vendorToken = "";
let organizerToken = "";
let customer;
let venueVendor;
let organizerVendor;
let newRequest;

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

  organizerVendor = await vendor.create({
    vendor_name: faker.name.findName(),
    vendor_email: faker.internet.email(),
    vendor_password: "Aneh123!!",
    vendor_type: "organizer",
  });

  newRequest = await Request.create({
    request_user_id: customer._id,
    request_package_id: packageData[1]._id,
    request_vendor_id: packageData[1].package_vendor_id,
    request_groom_name: "McGroom",
    request_bride_name: "McBride",
    request_city: "bandung",
    request_wedding_location: "bandung",
    request_budget: 50000000,
    request_wedding_date: "12-05-2021",
    request_invitees: 100,
  });

  // create a token based off that customer or vendor
  customerToken = jwt.sign({ user: customer._id }, process.env.JWT_SECRET);
  vendorToken = jwt.sign({ user: venueVendor._id }, process.env.JWT_SECRET);
  organizerToken = jwt.sign(
    { user: organizerVendor._id },
    process.env.JWT_SECRET
  );
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
        package_services: "cleaning service",
        package_capacity: "50-250",
      });

    expect(response.statusCode).toEqual(201);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Create package invalid inputs for venue", async () => {
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

  it("Create package invalid inputs for organizer", async () => {
    const response = await request(app)
      .post("/packages")
      .set("Authorization", `Bearer ${organizerToken}`) // set the token in the test
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
});

describe("GET /packages", () => {
  it("Get all packages", async () => {
    const response = await request(app).get("/packages");

    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Get packages count", async () => {
    const response = await request(app).get("/packages/count");

    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Get all packages with filter", async () => {
    const response = await request(app).get(
      "/packages?page=1&limit=5&min_capacity=0&max_capacity=3000&min_price=0&max_price=100000000&location=bandung&location=jakarta&location=batam&location=malang&location=pyongyang&type=venue&type=organizer&search=a"
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

  it("Get package by id", async () => {
    const response = await request(app).get(`/packages/${packageData[0]._id}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Get package by id should have pending request", async () => {
    const response = await request(app)
      .get(`/packages/${packageData[1]._id}`)
      .set("Authorization", `Bearer ${customerToken}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.has_request_pending).toEqual(true);
  });

  it("Get package by id not found", async () => {
    const response = await request(app).get(
      `/packages/61248b5ad302b53b72363705`
    );

    expect(response.statusCode).toEqual(404);
    expect(response.body).toBeInstanceOf(Object);
  });
});

describe("GET /packages for vendor", () => {
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

describe("GET /packages by vendor id", () => {
  it("Get packages by vendor id", async () => {
    const response = await request(app)
      .get(`/packages/view/${venueVendor._id}`)
      .set("Authorization", `Bearer ${vendorToken}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Get packages by vendor id with pagination", async () => {
    const response = await request(app)
      .get(`/packages/view/${venueVendor._id}?page=1&limit=2`)
      .set("Authorization", `Bearer ${vendorToken}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Get packages by vendor id not found", async () => {
    const response = await request(app)
      .get(`/packages/view/61248b5ad302b53b72363705`)
      .set("Authorization", `Bearer ${vendorToken}`);

    expect(response.statusCode).toEqual(404);
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

  it("package invalid input", async () => {
    const findPackage = await Package.find({
      package_vendor_id: venueVendor._id,
    });

    const response = await request(app)
      .put(`/packages/${findPackage[0]._id}`)
      .set("Authorization", `Bearer ${vendorToken}`) // set the token in the test
      .send({
        package_status: "invalid input",
      });

    expect(response.statusCode).toEqual(400);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("package should not be found", async () => {
    const response = await request(app)
      .put(`/packages/6124d9b4056a41160b52b73f`)
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

    expect(response.statusCode).toEqual(404);
    expect(response.body).toBeInstanceOf(Object);
  });

  // it("upload package_album", async () => {
  //   const findPackage = await Package.find({
  //     package_vendor_id: venueVendor._id,
  //   });

  //   const response = await request(app)
  //     .put(`/packages/${findPackage[0]._id}`)
  //     .set("Authorization", `Bearer ${vendorToken}`) // set the token in the test
  //     .attach("package_album", "./config/Glints-logo.jpeg");

  //   expect(response.statusCode).toEqual(201);
  //   expect(response.body).toBeInstanceOf(Object);
  // });
});

describe("DELETE /packages", () => {
  it("Package must be deleted", async () => {
    const randomPackageId = await Package.find({
      package_vendor_id: venueVendor._id,
    });
    const response = await request(app)
      .delete(`/packages/${randomPackageId[randomPackageId.length - 1]._id}`)
      .set("Authorization", `Bearer ${vendorToken}`); // set the token in the test

    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Package should be not found", async () => {
    const randomPackageId = await Package.find({
      package_vendor_id: venueVendor._id,
    });
    const response = await request(app)
      .delete(`/packages/6124d9b4056a41160b52b73f`)
      .set("Authorization", `Bearer ${vendorToken}`); // set the token in the test

    expect(response.statusCode).toEqual(404);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("User should get forbidden access", async () => {
    const randomPackageId = packageData[packageData.length - 5]._id;
    const response = await request(app)
      .delete(`/packages/${randomPackageId}`)
      .set("Authorization", `Bearer ${customerToken}`); // set the token in the test

    expect(response.statusCode).toEqual(403);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Should get no auth token error", async () => {
    const randomPackageId = packageData[packageData.length - 5]._id;
    const response = await request(app).delete(`/packages/${randomPackageId}`);

    expect(response.statusCode).toEqual(403);
    expect(response.body).toBeInstanceOf(Object);
  });
});

describe("GET archived packages", () => {
  it("Must get all archived packages", async () => {
    const response = await request(app)
      .get(`/packages/archive`)
      .set("Authorization", `Bearer ${vendorToken}`);
    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeInstanceOf(Object);
  });
});

describe("GET /config", () => {
  it("Get venue services", async () => {
    const response = await request(app).get("/config/venue");

    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Get organizer services", async () => {
    const response = await request(app).get("/config/organizer");

    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Get location services", async () => {
    const response = await request(app).get("/config/locations");

    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeInstanceOf(Object);
  });
});
