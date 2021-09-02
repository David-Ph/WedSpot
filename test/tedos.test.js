const request = require("supertest");
const faker = require("faker");
const jwt = require("jsonwebtoken");
const app = require("../app");
const { User, Todo } = require("../models");
let customerToken = "";
let customer;
let customerTwo;
let customerTwoToken;

beforeAll(async () => {
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

  // create a token based off that customer or vendor
  customerToken = jwt.sign({ user: customer._id }, process.env.JWT_SECRET);
  customerTwoToken = jwt.sign(
    { user: customerTwo._id },
    process.env.JWT_SECRET
  );
});

describe("POST /todos", () => {
  it("Create todo should succeed", async () => {
    const response = await request(app)
      .post("/todos")
      .set("Authorization", `Bearer ${customerToken}`) // set the token in the test
      .send({
        todo_title: "Get caterer",
        todo_notes: "don't get disgusting food",
        todo_is_done: true,
      });

    expect(response.statusCode).toEqual(201);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Create todo should succeed for customerTwo", async () => {
    const response = await request(app)
      .post("/todos")
      .set("Authorization", `Bearer ${customerTwoToken}`) // set the token in the test
      .send({
        todo_title: "Get caterer",
        todo_notes: "don't get disgusting food",
        todo_is_done: true,
      });

    expect(response.statusCode).toEqual(201);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Create todo empty title", async () => {
    const response = await request(app)
      .post("/todos")
      .set("Authorization", `Bearer ${customerToken}`) // set the token in the test
      .send({
        todo_title: "",
        todo_notes: "don't get disgusting food",
        todo_is_done: true,
      });

    expect(response.statusCode).toEqual(500);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Create todo user not logged in", async () => {
    const response = await request(app)
      .post("/todos") // set the token in the test
      .send({
        todo_title: "Get caterer",
        todo_notes: "don't get disgusting food",
        todo_is_done: true,
      });

    expect(response.statusCode).toEqual(403);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Create todo invalid date", async () => {
    const response = await request(app)
      .post("/todos")
      .set("Authorization", `Bearer ${customerToken}`) // set the token in the test
      .send({
        todo_title: "Get caterer",
        todo_due_date: "Invalid date",
        todo_notes: "don't get disgusting food",
        todo_is_done: true,
      });

    expect(response.statusCode).toEqual(400);
    expect(response.body).toBeInstanceOf(Object);
  });
});

describe("GET /todos", () => {
  it("Get one todo", async () => {
    const findTodo = await Todo.find();
    const response = await request(app)
      .get(`/todos/${findTodo[0]._id}`)
      .set("Authorization", `Bearer ${customerToken}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Get one todo not found", async () => {
    const response = await request(app)
      .get(`/todos/6124d9b4056a41160b52b73f`)
      .set("Authorization", `Bearer ${customerToken}`);

    expect(response.statusCode).toEqual(404);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Get all todo", async () => {
    const response = await request(app)
      .get(`/todos`)
      .set("Authorization", `Bearer ${customerToken}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeInstanceOf(Object);
  });
});
// 6124d9b4056a41160b52b73f
describe("PUT /todos", () => {
  it("Update todo", async () => {
    const findTodo = await Todo.find({
      todo_user_id: customer._id,
    });

    const response = await request(app)
      .put(`/todos/${findTodo[0]._id}`)
      .set("Authorization", `Bearer ${customerToken}`)
      .send({
        todo_title: "Get caterer",
        todo_due_date: "2021-09-25",
        todo_notes: "don't get disgusting food",
        todo_is_done: true,
      });

    expect(response.statusCode).toEqual(201);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Update todo not found", async () => {
    const response = await request(app)
      .put(`/todos/6124d9b4056a41160b52b73f`)
      .set("Authorization", `Bearer ${customerToken}`)
      .send({
        todo_title: "Get caterer",
        todo_due_date: "2021-09-25",
        todo_notes: "don't get disgusting food",
        todo_is_done: true,
      });

    expect(response.statusCode).toEqual(404);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Update todo invalid date and is_done", async () => {
    const findTodo = await Todo.find({
      todo_user_id: customer._id,
    });

    const response = await request(app)
      .put(`/todos/${findTodo[0]._id}`)
      .set("Authorization", `Bearer ${customerToken}`)
      .send({
        todo_title: "Get caterer",
        todo_due_date: "invalid date",
        todo_notes: "don't get disgusting food",
        todo_is_done: "invalid is_done",
      });

    expect(response.statusCode).toEqual(400);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Update todo for another user should fail", async () => {
    const findTodo = await Todo.find({
      todo_user_id: customerTwo._id,
    });

    const response = await request(app)
      .put(`/todos/${findTodo[0]._id}`)
      .set("Authorization", `Bearer ${customerToken}`)
      .send({
        todo_title: "Get caterer",
        todo_due_date: "invalid date",
        todo_notes: "don't get disgusting food",
        todo_is_done: "invalid is_done",
      });

    expect(response.statusCode).toEqual(403);
    expect(response.body).toBeInstanceOf(Object);
  });
});

describe("DELETE /todos", () => {
  it("delete one todo", async () => {
    const findTodo = await Todo.find();
    const response = await request(app)
      .delete(`/todos/${findTodo[0]._id}`)
      .set("Authorization", `Bearer ${customerToken}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("delete one todo not found", async () => {
    const response = await request(app)
      .delete(`/todos/6124d9b4056a41160b52b73f`)
      .set("Authorization", `Bearer ${customerToken}`);

    expect(response.statusCode).toEqual(404);
    expect(response.body).toBeInstanceOf(Object);
  });
});
