const request = require("supertest");
const faker = require("faker");
const jwt = require("jsonwebtoken");
const app = require("../app");
const { User } = require("../models");
let data = [];
let user_token = [];

beforeAll(async () => {
  data = await User.find();

  const user1 = await User.create({
    user_fullname: faker.name.findName(),
    user_email: faker.internet.email(),
    user_password: "Oke12345!",
  });

  user_token = jwt.sign({ User: user1._id }, process.env.JWT_SECRET);
});

describe("User Signup", () => {
  it("Sign up success", async () => {
    const res = await request(app).post("/user/register").send({
      user_fullname: faker.name.findName(),
      user_email: faker.internet.email(),
      user_password: "Oke12345!",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Object);
  });

  it("Empty email", async () => {
    const res = await request(app).post("/user/register").send({
      user_fullname: faker.name.findName(),
      user_email: "",
      user_password: "Oke12345!",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toBeInstanceOf(Object);
  });

  it("Minim character username should fail", async () => {
    const res = await request(app).post("/user/register").send({
      user_fullname: "ok",
      user_email: faker.internet.email(),
      user_password: "Oke12345!",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toBeInstanceOf(Object);
  });

  it("Duplicate Email should fail", async () => {
    const res = await request(app).post("/user/register").send({
      user_fullname: faker.name.findName(),
      user_email: data[0].user_email,
      user_password: "Oke12345!",
    });
    expect(res.statusCode).toEqual(401);
    expect(res.body).toBeInstanceOf(Object);
  });

  it("Weak user_password should fail", async () => {
    const res = await request(app).post("/user/register").send({
      user_fullname: faker.name.findName(),
      user_email: faker.internet.email(),
      user_password: "Useraja",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toBeInstanceOf(Object);
  });

  it("Invalid email should fail", async () => {
    const res = await request(app).post("/user/register").send({
      user_fullname: faker.name.findName(),
      user_email: "notrealemail",
      user_password: "Oke12345!23",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toBeInstanceOf(Object);
  });
});

describe("User Signin", () => {
  it("Signin success", async () => {
    const res = await request(app).post("/user/login").send({
      user_email: "unittest@email.com",
      user_password: "Oke12345!",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Object);
  });

  it("Signin empty field should fail", async () => {
    const res = await request(app).post("/user/login").send({
      user_email: "",
      user_password: "Oke12345!",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toBeInstanceOf(Object);
  });

  it("Signin empty field should fail", async () => {
    const res = await request(app).post("/user/login").send({
      user_email: "notvalid",
      user_password: "Oke12345!",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toBeInstanceOf(Object);
  });

  it("User not found", async () => {
    const res = await request(app).post("/user/login").send({
      user_email: "notvalid@gmail.com",
      user_password: "Oke12345!",
    });
    expect(res.statusCode).toEqual(401);
    expect(res.body).toBeInstanceOf(Object);
  });

  it("Wrong user_password should fail", async () => {
    const res = await request(app).post("/user/login").send({
      user_email: "testing1@gmail.com",
      user_password: "Oke123",
    });
    expect(res.statusCode).toEqual(401);
    expect(res.body).toBeInstanceOf(Object);
  });
});

describe("Get my profile", () => {
  it("get my profil success", async () => {
    const res = await request(app)
      .get("/user/getprofil")
      .set("Authorization", `Bearer ${user_token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Object);
  });

  it("No user logged in and should fail", async () => {
    const res = await request(app)
      .get("/user/getprofil")
      .set("Authorization", `Bearer No user login`);
    expect(res.statusCode).toEqual(403);
    expect(res.body).toBeInstanceOf(Object);
  });
});

// describe("Update User", () => {
//   it("updateUser success", async () => {
//     const res = await request(app)
//       .put(`/user/edit`)
//       .set("Authorization", `Bearer ${user_token}`)
//       .send({
//         user_fullname: faker.name.findName(),
//         user_email: faker.internet.email(),
//         user_birthday: "1990-03-27",
//         user_password: "Oke12345!",
//       });
//     expect(res.statusCode).toEqual(201);
//     expect(res.body).toBeInstanceOf(Object);
//   });

//   it("Duplicate Email and should fail", async () => {
//     const res = await request(app)
//       .put("/user/edit")
//       .set("Authorization", `Bearer ${user_token}`)
//       .send({
//         user_fullname: faker.name.findName(),
//         email: data[0].user_email,
//         user_birthday: "1990-03-27",
//         user_password: "Oke12345!",
//       });
//     expect(res.statusCode).toEqual(500);
//     expect(res.body).toBeInstanceOf(Object);
//   });

//   it("user_fullname that contains symbols should fail", async () => {
//     const res = await request(app)
//       .put("/user/edit")
//       .set("Authorization", `Bearer ${user_token}`)
//       .send({
//         user_fullname: "&^&^&^&",
//         email: faker.internet.email(),
//         user_birthday: "1990-03-27",
//         user_password: "Oke12345!",
//       });
//     expect(res.statusCode).toEqual(400);
//     expect(res.body).toBeInstanceOf(Object);
//   });

//   it("user_fullname length less than 3 should fail", async () => {
//     const res = await request(app)
//       .put("/user/edit")
//       .set("Authorization", `Bearer ${user_token}`)
//       .send({
//         user_fullname: "da",
//         email: faker.internet.email(),
//         user_birthday: "1990-03-27",
//         user_password: "Oke12345!",
//       });
//     expect(res.statusCode).toEqual(400);
//     expect(res.body).toBeInstanceOf(Object);
//   });

//   it("updating invalid email should fail", async () => {
//     const res = await request(app)
//       .put("/user/edit")
//       .set("Authorization", `Bearer ${user_token}`)
//       .send({
//         user_fullname: "daddy",
//         email: "notanemail",
//         user_birthday: "1990-03-27",
//         user_password: "Oke12345!",
//       });
//     expect(res.statusCode).toEqual(400);
//     expect(res.body).toBeInstanceOf(Object);
//   });

//   it("updating weak user_password should fail", async () => {
//     const res = await request(app)
//       .put("/user/edit")
//       .set("Authorization", `Bearer ${user_token}`)
//       .send({
//         user_fullname: "daddy",
//         email: faker.internet.email(),
//         user_birthday: "1990-03-27",
//         user_password: "hehe",
//       });
//     expect(res.statusCode).toEqual(400);
//     expect(res.body).toBeInstanceOf(Object);
//   });

//   it("updating user without auth token should fail", async () => {
//     const res = await request(app).put("/user/edit").send({
//       user_fullname: faker.name.findName(),
//       email: faker.internet.email(),
//       user_birthday: "1990-03-27",
//       user_password: "Oke12345!",
//     });

//     expect(res.statusCode).toEqual(403);
//     expect(res.body).toBeInstanceOf(Object);
//   });
// });
