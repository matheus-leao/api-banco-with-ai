const checkoutModel = require("../model/checkoutModel");

const PRODUCTS = {
  1: { id: 1, name: "Product 1", price: 100 },
  2: { id: 2, name: "Product 2", price: 200 },
};

const processCheckout = (checkoutData) => {
  const { username, productId, quantity, paymentMethod } = checkoutData;

  if (!PRODUCTS[productId]) {
    throw new Error("Produto não encontrado");
  }

  const product = PRODUCTS[productId];
  const totalAmount = product.price * quantity;

  const checkout = {
    id: checkoutModel.checkouts.length + 1,
    username,
    productId,
    productName: product.name,
    quantity,
    unitPrice: product.price,
    totalAmount,
    paymentMethod,
    timestamp: new Date().toISOString(),
  };

  checkoutModel.checkouts.push(checkout);
  return checkout;
};

const getUserCheckouts = (username) => {
  return checkoutModel.checkouts.filter((c) => c.username === username);
};

const getAllCheckouts = () => {
  return checkoutModel.checkouts;
};

module.exports = {
  processCheckout,
  getUserCheckouts,
  getAllCheckouts,
};
