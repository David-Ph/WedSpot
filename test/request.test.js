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
let newPackage;

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

  // create a token based off that customer or vendor
  customerToken = jwt.sign({ user: customer._id }, process.env.JWT_SECRET);
  vendorToken = jwt.sign({ user: venueVendor._id }, process.env.JWT_SECRET);
  organizerToken = jwt.sign(
    { user: organizerVendor._id },
    process.env.JWT_SECRET
  );
});

describe("POST /requests", () => {
  it("Create request should succeed", async () => {
    const response = await request(app)
      .post("/requests")
      .set("Authorization", `Bearer ${customerToken}`) // set the token in the test
      .send({
        request_package_id: `${newPackage._id}`,
        request_groom_name: "McGroom",
        request_bride_name: "McBride",
        request_city: "bandung",
        request_wedding_location: "bandung",
        request_budget: 50000000,
        request_wedding_date: "12-05-2021",
        request_invitees: 100,
      });

    expect(response.statusCode).toEqual(201);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Create request should not succeed", async () => {
    const response = await request(app)
      .post("/requests")
      .set("Authorization", `Bearer ${customerToken}`) // set the token in the test
      .send({
        request_package_id: `${newPackage._id}`,
        request_groom_name: "McGroom",
        request_bride_name: "McBride",
        request_city: "bandung",
        request_wedding_location: "bandung",
        request_budget: 50000000,
        request_wedding_date: "12-05-2021",
        request_invitees: 100,
      });

    expect(response.statusCode).toEqual(400);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Create request no auth token", async () => {
    const packageId = packageData[0]._id;
    const response = await request(app)
      .post("/requests")
      .send({
        request_package_id: `${packageId}`,
        request_groom_name: "McGroom",
        request_bride_name: "McBride",
        request_city: "bandung",
        request_wedding_location: "bandung",
        request_budget: "note a number",
        request_wedding_date: "not a date",
        request_invitees: "not an invitee",
      });

    expect(response.statusCode).toEqual(403);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("package not found", async () => {
    const response = await request(app)
      .post("/requests")
      .set("Authorization", `Bearer ${customerToken}`)
      .send({
        request_package_id: `6124d9b4056a41160b52b73f`,
        request_groom_name: "McGroom",
        request_bride_name: "McBride",
        request_city: "bandung",
        request_wedding_location: "bandung",
        request_budget: 50000000,
        request_wedding_date: "12-05-2021",
        request_invitees: 100,
      });

    expect(response.statusCode).toEqual(400);
    expect(response.body).toBeInstanceOf(Object);
  });
});

describe("GET /requests", () => {
  it("Get one request", async () => {
    const findRequest = await Request.find();
    const response = await request(app).get(`/requests/${findRequest[0]._id}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Get one request not found", async () => {
    const response = await request(app).get(
      `/requests/6124d9b4056a41160b52b73f`
    );

    expect(response.statusCode).toEqual(404);
    expect(response.body).toBeInstanceOf(Object);
  });
});

describe("GET /requests for user", () => {
  it("Get all requests for user", async () => {
    const response = await request(app)
      .get("/requests/user")
      .set("Authorization", `Bearer ${customerToken}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Get all requests for user with queries", async () => {
    const response = await request(app)
      .get("/requests/user?page=1&limit=2")
      .set("Authorization", `Bearer ${customerToken}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Get all requests for user not found", async () => {
    const response = await request(app)
      .get("/requests/user?page=50&limit=20")
      .set("Authorization", `Bearer ${customerToken}`);

    expect(response.statusCode).toEqual(404);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("no auth token should fail", async () => {
    const response = await request(app).get("/requests/user");

    expect(response.statusCode).toEqual(403);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Vendor should get forbidden access", async () => {
    const response = await request(app)
      .get("/requests/user")
      .set("Authorization", `Bearer ${vendorToken}`);

    expect(response.statusCode).toEqual(403);
    expect(response.body).toBeInstanceOf(Object);
  });
});

describe("GET /requests for vendor", () => {
  it("Get all requests for vendor", async () => {
    const response = await request(app)
      .get("/requests/vendor")
      .set("Authorization", `Bearer ${vendorToken}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Get all requests for vendor with queries", async () => {
    const response = await request(app)
      .get(
        "/requests/vendor?page=1&limit=2&sort_by=request_status&order_by=asc&status=false"
      )
      .set("Authorization", `Bearer ${vendorToken}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("should not be found", async () => {
    const response = await request(app)
      .get("/requests/vendor?page=50&limit=5")
      .set("Authorization", `Bearer ${vendorToken}`);

    expect(response.statusCode).toEqual(404);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("User should get forbidden access", async () => {
    const response = await request(app)
      .get("/requests/vendor")
      .set("Authorization", `Bearer ${customerToken}`);

    expect(response.statusCode).toEqual(403);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("no auth token should fail", async () => {
    const response = await request(app).get("/requests/vendor");

    expect(response.statusCode).toEqual(403);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Get all requests for vendor invalid queries", async () => {
    const response = await request(app)
      .get("/requests/vendor?page=asd&limit=asd")
      .set("Authorization", `Bearer ${vendorToken}`);

    expect(response.statusCode).toEqual(400);
    expect(response.body).toBeInstanceOf(Object);
  });
});
