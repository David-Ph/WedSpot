const request = require("supertest");
const faker = require("faker");
const jwt = require("jsonwebtoken");
const app = require("../app");
const { User, Notification, Request, vendor, Package } = require("../models");
let packageData, notificationData;
let customer;
let customerToken;
let customerTwo;
let customerTwoToken;
let venueVendor;
let vendorToken;
let organizerVendor;
let organizerToken;

beforeAll(async () => {
  packageData = await Package.find();
  notificationData = await Notification.find();
  // create user and admin
  customer = await User.create({
    user_fullname: faker.name.findName(),
    user_email: faker.internet.email(),
    user_password: "Aneh123!!",
  });

  customerTwo = await User.create({
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
  customerTwoToken = jwt.sign(
    { user: customerTwo._id },
    process.env.JWT_SECRET
  );
  organizerToken = jwt.sign(
    { user: organizerVendor._id },
    process.env.JWT_SECRET
  );
  vendorToken = jwt.sign({ user: venueVendor._id }, process.env.JWT_SECRET);
});

describe("GET /notifications", () => {
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

  it("Get notifications for user", async () => {
    const response = await request(app)
      .get(`/notifications/user`)
      .set("Authorization", `Bearer ${customerToken}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Get notifications for user with pagination", async () => {
    const response = await request(app)
      .get(`/notifications/user?page=1&limit=1`)
      .set("Authorization", `Bearer ${customerToken}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Get notifications for user invalid query", async () => {
    const response = await request(app)
      .get(`/notifications/user?page=asd&limit=asd`)
      .set("Authorization", `Bearer ${customerToken}`);

    expect(response.statusCode).toEqual(400);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Get notifications for user should fail for no token", async () => {
    const response = await request(app).get(`/notifications/user`);

    expect(response.statusCode).toEqual(403);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Get notifications for user should fail for vendor", async () => {
    const response = await request(app)
      .get(`/notifications/user`)
      .set("Authorization", `Bearer ${vendorToken}`);

    expect(response.statusCode).toEqual(403);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Get notifications for vendor", async () => {
    const response = await request(app)
      .get(`/notifications/vendor`)
      .set("Authorization", `Bearer ${vendorToken}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Get notifications for vendor with pagination", async () => {
    const response = await request(app)
      .get(`/notifications/vendor?page=1&limit=1`)
      .set("Authorization", `Bearer ${vendorToken}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Get notifications for vendor invalid query", async () => {
    const response = await request(app)
      .get(`/notifications/vendor?page=asd&limit=asd`)
      .set("Authorization", `Bearer ${vendorToken}`);

    expect(response.statusCode).toEqual(400);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Get notifications for vendor unauthorized", async () => {
    const response = await request(app)
      .get(`/notifications/vendor`)
      .set("Authorization", `Bearer ${customerToken}`);

    expect(response.statusCode).toEqual(403);
    expect(response.body).toBeInstanceOf(Object);
  });
});
// 6124d9b4056a41160b52b73f

describe("PUT /notifications", () => {
  it("Update notification isNew user", async () => {
    const findNotification = await Notification.find({
      notification_forUser: customer._id,
    });

    const response = await request(app)
      .put(`/notifications/user/${findNotification[0]._id}`)
      .set("Authorization", `Bearer ${customerToken}`);

    expect(response.statusCode).toEqual(201);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Update notification user unauthorized", async () => {
    const findNotification = await Notification.find({
      notification_forUser: customer._id,
    });

    const response = await request(app)
      .put(`/notifications/user/${findNotification[0]._id}`)
      .set("Authorization", `Bearer ${customerTwoToken}`);

    expect(response.statusCode).toEqual(403);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Update notification user no auth token", async () => {
    const findNotification = await Notification.find({
      notification_forUser: customer._id,
    });

    const response = await request(app).put(
      `/notifications/user/${findNotification[0]._id}`
    );

    expect(response.statusCode).toEqual(403);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Update notification user not found", async () => {
    const response = await request(app)
      .put(`/notifications/user/613afaa141658f48c340d582`)
      .set("Authorization", `Bearer ${customerToken}`);

    expect(response.statusCode).toEqual(404);
    expect(response.body).toBeInstanceOf(Object);
  });

  //   vendor

  it("Update notification isNew vendor", async () => {
    const findNotification = await Notification.find({
      notification_forVendor: venueVendor._id,
    });

    const response = await request(app)
      .put(`/notifications/vendor/${findNotification[0]._id}`)
      .set("Authorization", `Bearer ${vendorToken}`);

    expect(response.statusCode).toEqual(201);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Update notification vendor unauthorized", async () => {
    const findNotification = await Notification.find({
      notification_forVendor: venueVendor._id,
    });

    const response = await request(app)
      .put(`/notifications/vendor/${findNotification[0]._id}`)
      .set("Authorization", `Bearer ${organizerToken}`);

    expect(response.statusCode).toEqual(403);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Update notification vendor no auth token", async () => {
    const findNotification = await Notification.find({
      notification_forVendor: venueVendor._id,
    });

    const response = await request(app).put(
      `/notifications/vendor/${findNotification[0]._id}`
    );

    expect(response.statusCode).toEqual(403);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Update notification vendor not found", async () => {
    const response = await request(app)
      .put(`/notifications/vendor/6124d9b4056a41160b52b73f`)
      .set("Authorization", `Bearer ${vendorToken}`);

    expect(response.statusCode).toEqual(404);
    expect(response.body).toBeInstanceOf(Object);
  });
});
