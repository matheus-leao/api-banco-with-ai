// Libs
const request = require("supertest");
const sinon = require("sinon");
const { expect } = require("chai");

const baseUrl = "http://localhost:3000";

//tests
describe("Transfer", () => {
  describe("POST /transfers", () => {
    it("Quando informo remetente e destinatários inexistentes recebo 400", async () => {
      const response = await request(baseUrl).post("/transfer").send({
        from: "Julio",
        to: "Matheus",
        amount: 10000,
      });

      expect(response.status).to.equal(400);
      expect(response.body).to.have.property(
        "error",
        "Usuário remetente ou destinatário não encontrado"
      );
    });

    it.only("Quando informo valores válidos recebo 201", async () => {
      const responseCreateUser = await request(baseUrl).post("/register").send({
        username: "matheus",
        password: "1234",
        favorecido: true,
      });
      expect(responseCreateUser.statusCode).to.equal(201, 'User 1 created') 
      const responseCreateUser2 = await request(baseUrl).post("/register").send({
        username: "julio",
        password: "1234",
        favorecido: true,
      });
      expect(responseCreateUser.statusCode).to.equal(201, 'User 2 created')

      const responseLogin = await request(baseUrl).post("/login").send({
        username: "matheus",
        password: "1234",
      });
      expect(responseLogin.statusCode).to.equal(200, 'Login user 1 done')

    const response = await request(baseUrl).post("/transfer").send({
        from: "julio",
        to: "matheus",
        amount: 100,
     });

      console.log(response);

      const responseExpected = require("../fixture/answers/quandoInformoValoresValidos.json");
      delete response.body.date;
      delete responseExpected.date;
      expect(response.statusCode).to.equal(201, 'Transferencia realizada');
      expect(response.body).to.deep.equal(responseExpected);
    });
  });
});
