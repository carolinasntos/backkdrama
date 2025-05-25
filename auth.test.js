// auth.test.js
const request = require("supertest");
const express = require("express");
const bodyParser = require("body-parser");
const { describe, it, expect, vi, beforeAll, afterAll } = require("vitest");

// 🔧 Mock de los modelos antes de importar el controlador
vi.mock("./src/models", () => {
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

// ✅ Importar el controlador con require
const userController = require("./src/controllers/auth.controller.js");

// Crear la app express de prueba
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