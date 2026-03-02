const express = require("express");
const userController = require("./controller/userController");
const transferController = require("./controller/transferController");
const checkoutController = require("./controller/checkoutController");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const authenticateToken = require("./auth");

const app = express();
app.use(express.json());

// User routes
app.post("/register", userController.register);
app.post("/login", userController.login);
app.get("/users", userController.getUsers);

// Transfer routes
app.post("/transfer", authenticateToken, transferController.createTransfer);
app.get("/transfers", authenticateToken, transferController.getTransfers);

// Checkout routes
app.post("/checkout", authenticateToken, checkoutController.checkout);
app.get("/checkouts", authenticateToken, checkoutController.getCheckouts);

// Swagger docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;
