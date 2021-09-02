const request = require("supertest");
const faker = require("faker");
const jwt = require("jsonwebtoken");
const app = require("../app");
const { Package, User, vendor } = require("../models");
let vendorData = [];
let customerToken = "";
let vendorToken = "";
let vendor;

beforeAll(async () => {
  vendorData = await vendor.find();
  // create vendor

  const theVendor = await vendor.create({
    vendor_name: faker.name.findName(),
    user_email: "unittest@email.com",
    user_password: "Oke12345!",
  });

  // create a token based off that customer or vendor
  vendorToken = jwt.sign({ vendor: theVendor._id }, process.env.JWT_SECRET);
});

describe("Vendor Register", () => {
  it("register success", async () => {
    const res = await request(app).post("/vendors/register").send({
      vendor_name: faker.name.findName(),
      vendor_email: faker.internet.email(),
      vendor_password: "Oke12345!",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Object);
  });

  it("Empty email", async () => {
    const res = await request(app).post("/vendors/register").send({
      vendor_name: faker.name.findName(),
      vendor_email: "",
      vendor_password: "Oke12345!",
    });
    expect(res.statusCode).toEqual(401);
    expect(res.body).toBeInstanceOf(Object);
  });

  it("Empty name", async () => {
    const res = await request(app).post("/vendors/register").send({
      vendor_name: "",
      vendor_email: faker.internet.email(),
      vendor_password: "Oke12345!",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toBeInstanceOf(Object);
  });

  it("Empty password", async () => {
    const res = await request(app).post("/vendors/register").send({
      vendor_name: faker.name.findName(),
      vendor_email: faker.internet.email(),
      vendor_password: "",
    });
    expect(res.statusCode).toEqual(401);
    expect(res.body).toBeInstanceOf(Object);
  });

  it("Weak password", async () => {
    const res = await request(app).post("/vendors/register").send({
      vendor_name: faker.name.findName(),
      vendor_email: faker.internet.email(),
      vendor_password: "kirainbisa",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toBeInstanceOf(Object);
  });

  it("Email format not valid", async () => {
    const res = await request(app).post("/vendors/register").send({
      vendor_name: faker.name.findName(),
      vendor_email: "kirainbisa",
      vendor_password: "Oke12345!",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toBeInstanceOf(Object);
  });

  it("Duplicate Email", async () => {
    const res = await request(app).post("/vendors/register").send({
      vendor_name: faker.name.findName(),
      vendor_email: vendorData[0].email,
      vendor_password: "Oke12345!",
    });
    expect(res.statusCode).toEqual(401);
    expect(res.body).toBeInstanceOf(Object);
  });

  describe("Vendor login", () => {
    it("Login success", async () => {
      const res = await request(app).post("/vendors/login").send({
        vendor_email: "unittest@email.com",
        vendor_password: "Oke12345!",
      });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeInstanceOf(Object);
    });

    it("Wrong email", async () => {
      const res = await request(app).post("/vendors/login").send({
        vendor_email: "wrongemailtologin",
        vendor_password: "Oke12345!",
      });
      expect(res.statusCode).toEqual(401);
      expect(res.body).toBeInstanceOf(Object);
    });

    it("Empty email", async () => {
      const res = await request(app).post("/vendors/login").send({
        vendor_email: "",
        vendor_password: "Oke12345!",
      });
      expect(res.statusCode).toEqual(401);
      expect(res.body).toBeInstanceOf(Object);
    });

    it("Wrong password", async () => {
      const res = await request(app).post("/vendors/login").send({
        vendor_email: "unittest@email.com",
        vendor_password: "Oke123",
      });
      expect(res.statusCode).toEqual(400);
      expect(res.body).toBeInstanceOf(Object);
    });
  });

  it("Empty password", async () => {
    const res = await request(app).post("/vendors/login").send({
      vendor_email: "unittest@email.com",
      vendor_password: "",
    });
    expect(res.statusCode).toEqual(401);
    expect(res.body).toBeInstanceOf(Object);
  });

  describe("PUT /vendors", () => {
    it("Vendor has been successfully updated", async () => {
      const findVendor = await vendor.find({
        vendor_id: vendor._id,
      });

      const response = await request(app)
        .put(`/vendors/edit`)
        .set("Authorization", `Bearer ${vendorToken}`) // set the token in the test
        .send({
          vendor_header:
            "https://images.unsplash.com/photo-1525441273400-056e9c7517b3?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHx8d2VkZGluZ3x8fHx8fDE2MzAxMzg4NzI&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=960",
          vendor_avatar:
            "https://images.unsplash.com/photo-1515923019249-6b544314450f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=360&ixid=MnwxfDB8MXxyYW5kb218MHx8d2VkZGluZ3x8fHx8fDE2MzAxMzg3NTc&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=360",
          vendor_name: "Bukit Mantun",
          vendor_email_info: "MantunBukit@email.com",
          vendor_facebook: "http://www.facebook.com/BukitMantun",
          vendor_instagram: "http://www.instagram.com/BukitMantun",
          vendor_location: "pyongyang",
          vendor_max_capacity: 15000,
          vendor_max_price: 1500000000,
          vendor_min_capacity: 500,
          vendor_min_price: 90000000,
          vendor_phone: "082399229922",
          vendor_twitter: "http://www.twitter.com/BukitMantun",
          vendor_type: "venue",
          vendor_website: "http://www.BukitMantun.com",
          vendor_rating: 5,
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
        const response = await request(app).get(
          `/packages/${packageData[0]._id}`
        );

        expect(response.statusCode).toEqual(200);
        expect(response.body).toBeInstanceOf(Object);
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
      const response = await request(app).delete(
        `/packages/${randomPackageId}`
      );

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
});
