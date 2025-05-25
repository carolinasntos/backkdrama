const request = require("supertest");
const express = require("express");
const bodyParser = require("body-parser");

// ✅ Mock manual de '../models'
jest.mock("./src/models", () => {
  const users = [];

  return {
    User: {
      create: async (data) => {
        const fakeUser = { ...data, id: users.length + 1 };
        users.push(fakeUser);
        return fakeUser;
      },
      findOne: async ({ where }) => {
        return users.find(user => user.email === where.email) || null;
      }
    }
  };
});

// ✅ Importa el controlador normalmente (CommonJS)
const userController = require("./src/controllers/auth.controller.js");

const app = express();
app.use(bodyParser.json());
app.post("/api/register", userController.register);
app.post("/api/login", userController.login);

describe("Auth API", () => {
  const testUser = {
    username: "caro",
    email: "caro@example.com",
    password: "123456"
  };

  it("registers a new user", async () => {
    const res = await request(app)
      .post("/api/register")
      .send(testUser);

    expect(res.statusCode).toBe(201);
    expect(res.body.user).toBeDefined();
    expect(res.body.user.email).toBe(testUser.email);
  });

  it("logs in the user", async () => {
    const res = await request(app)
      .post("/api/login")
      .send({ email: testUser.email, password: testUser.password });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  it("rejects login with incorrect password", async () => {
    const res = await request(app)
      .post("/api/login")
      .send({ email: testUser.email, password: "wrongpass" });

    expect(res.statusCode).toBe(401);
    expect(res.body.error).toBe("Contraseña incorrecta");
  });
});