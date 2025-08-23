// Libs
const request = require("supertest");
const sinon = require("sinon");
const { expect } = require("chai");

// App
const app = require("../../app");

// Mock
const userService = require("../../service/userService");

// Testes
describe("User Controller", () => {
  describe("Register", () => {
    it("Try to register an user without password", async () => {
      const response = await request(app).post("/register").send({
        username: "math",
        favorecido: true,
      });
      expect(response.statusCode).to.equal(400);
    });
    it("Try to register an user without username", async () => {
      const response = await request(app).post("/register").send({
        password: "1234",
        favorecido: true,
      });
      expect(response.statusCode).to.equal(400);
    });
  });

  describe("Users", () => {
    it("List all users", async () => {
      const response = await request(app).get("/users");
      expect(response.statusCode).to.equal(200);
    });
  });
});
