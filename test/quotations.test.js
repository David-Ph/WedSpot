const request = require("supertest");
const faker = require("faker");
const jwt = require("jsonwebtoken");
const app = require("../app");
const { Package, User, vendor, Request, Quotation } = require("../models");
let packageData = [];
let customerToken = "";
let vendorToken = "";
let organizerToken = "";
let customer;
let venueVendor;
let organizerVendor;
let newPackage;
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

  newPackage = await Package.create({
    package_vendor_id: venueVendor._id,
    package_type: venueVendor.vendor_type,
    package_name: "Random Package Name",
    package_location: "bandung",
    package_price: 25000000,
    package_services: "electricity",
    package_capacity: "50-250",
  });

  newRequest = await Request.create({
    request_user_id: customer._id,
    request_package_id: newPackage._id,
    request_vendor_id: newPackage.package_vendor_id,
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

describe("POST /quotations", () => {
  it("Create quotations should succeed", async () => {
    const response = await request(app)
      .post("/quotations")
      .set("Authorization", `Bearer ${vendorToken}`) // set the token in the test
      .send({
        quotation_request_id: newRequest._id,
        quotation_file: "image.png",
        quotation_status: "accepted",
      });

    expect(response.statusCode).toEqual(201);
    expect(response.body).toBeInstanceOf(Object);
  });

  // it("Upload quotations should succeed", async () => {
  //   const response = await request(app)
  //     .post("/quotations")
  //     .set("Authorization", `Bearer ${vendorToken}`) // set the token in the test
  //     .attach("quotation_file", "./config/Glints-logo.jpeg")
  //     .field("quotation_request_id", `${newRequest._id}`);

  //   expect(response.statusCode).toEqual(201);
  //   expect(response.body).toBeInstanceOf(Object);
  // });

  it("Create quotations request not found", async () => {
    const response = await request(app)
      .post("/quotations")
      .set("Authorization", `Bearer ${vendorToken}`) // set the token in the test
      .send({
        quotation_request_id: "6124d9b4056a41160b52b73f",
        quotation_file: "image.png",
      });

    expect(response.statusCode).toEqual(400);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("No auth token should fail", async () => {
    const response = await request(app).post("/quotations").send({
      quotation_request_id: "6124d9b4056a41160b52b73f",
      quotation_file: "image.png",
    });

    expect(response.statusCode).toEqual(403);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Forbidden access when user tries to create", async () => {
    const response = await request(app)
      .post("/quotations")
      .set("Authorization", `Bearer ${customerToken}`) // set the token in the test
      .send({
        quotation_request_id: newRequest._id,
        quotation_file: "image.png",
      });

    expect(response.statusCode).toEqual(403);
    expect(response.body).toBeInstanceOf(Object);
  });
});

describe("GET /quotations", () => {
  it("Get one quotations", async () => {
    const findQuotation = await Quotation.find();
    const response = await request(app).get(
      `/quotations/${findQuotation[0]._id}`
    );

    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Get one quotation not found", async () => {
    const response = await request(app).get(
      `/quotations/6124d9b4056a41160b52b73f`
    );

    expect(response.statusCode).toEqual(404);
    expect(response.body).toBeInstanceOf(Object);
  });
});

describe("GET /quotations for user", () => {
  it("Get all quotations for user", async () => {
    const response = await request(app)
      .get("/quotations/user")
      .set("Authorization", `Bearer ${customerToken}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Get all quotations for user with queries", async () => {
    const response = await request(app)
      .get(
        "/quotations/user?page=1&limit=2&sort_by=request_status&order_by=asc"
      )
      .set("Authorization", `Bearer ${customerToken}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Get all quotations for user not found", async () => {
    const response = await request(app)
      .get("/quotations/user?page=50&limit=20")
      .set("Authorization", `Bearer ${customerToken}`);

    expect(response.statusCode).toEqual(404);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("no auth token should fail", async () => {
    const response = await request(app).get("/quotations/user");

    expect(response.statusCode).toEqual(403);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Vendor should get forbidden access", async () => {
    const response = await request(app)
      .get("/quotations/user")
      .set("Authorization", `Bearer ${vendorToken}`);

    expect(response.statusCode).toEqual(403);
    expect(response.body).toBeInstanceOf(Object);
  });
});

describe("GET /quotations for vendor", () => {
  it("Get all quotations for vendor", async () => {
    const response = await request(app)
      .get("/quotations/vendor")
      .set("Authorization", `Bearer ${vendorToken}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Get all quotations for vendor with queries", async () => {
    const response = await request(app)
      .get(
        "/quotations/vendor?page=1&limit=2&sort_by=request_status&order_by=asc"
      )
      .set("Authorization", `Bearer ${vendorToken}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("should not be found", async () => {
    const response = await request(app)
      .get("/quotations/vendor?page=50&limit=5")
      .set("Authorization", `Bearer ${vendorToken}`);

    expect(response.statusCode).toEqual(404);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("User should get forbidden access", async () => {
    const response = await request(app)
      .get("/quotations/vendor")
      .set("Authorization", `Bearer ${customerToken}`);

    expect(response.statusCode).toEqual(403);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("no auth token should fail", async () => {
    const response = await request(app).get("/quotations/vendor");

    expect(response.statusCode).toEqual(403);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Get all quotations for vendor invalid queries", async () => {
    const response = await request(app)
      .get("/quotations/vendor?page=asd&limit=asd")
      .set("Authorization", `Bearer ${vendorToken}`);

    expect(response.statusCode).toEqual(400);
    expect(response.body).toBeInstanceOf(Object);
  });
});

describe("PUT /quotations status for user", () => {
  it("Update quotation status", async () => {
    const findQuotation = await Quotation.find({
      quotation_user_id: customer._id,
    });

    const response = await request(app)
      .put(`/quotations/${findQuotation[0]._id}`)
      .set("Authorization", `Bearer ${customerToken}`)
      .send({
        quotation_status: "accepted",
      });

    expect(response.statusCode).toEqual(201);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Update quotation invalid status", async () => {
    const findQuotation = await Quotation.find({
      quotation_user_id: customer._id,
    });
    const response = await request(app)
      .put(`/quotations/${findQuotation[0]._id}`)
      .set("Authorization", `Bearer ${customerToken}`)
      .send({
        quotation_status: "invalid status",
      });

    expect(response.statusCode).toEqual(400);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Update quotation unauthorized", async () => {
    const findQuotation = await Quotation.find();
    const response = await request(app)
      .put(`/quotations/${findQuotation[0]._id}`)
      .set("Authorization", `Bearer ${customerToken}`)
      .send({
        quotation_status: "accepted",
      });

    expect(response.statusCode).toEqual(401);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Update quotation not found", async () => {
    const response = await request(app)
      .put(`/quotations/6124d9b4056a41160b52b73f`)
      .set("Authorization", `Bearer ${customerToken}`)
      .send({
        quotation_status: "accepted",
      });

    expect(response.statusCode).toEqual(404);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("No auth token should fail", async () => {
    const findQuotation = await Quotation.find();
    const response = await request(app)
      .put(`/quotations/${findQuotation[0]._id}`)
      .send({
        quotation_status: "accepted",
      });

    expect(response.statusCode).toEqual(403);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Forbidden access for vendor", async () => {
    const findQuotation = await Quotation.find();
    const response = await request(app)
      .put(`/quotations/${findQuotation[0]._id}`)
      .set("Authorization", `Bearer ${vendorToken}`)
      .send({
        quotation_status: "accepted",
      });

    expect(response.statusCode).toEqual(403);
    expect(response.body).toBeInstanceOf(Object);
  });
});
