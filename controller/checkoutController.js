const checkoutService = require("../service/checkoutService");

exports.checkout = (req, res) => {
  try {
    const { productId, quantity, paymentMethod } = req.body;
    
    if (!productId || !quantity || !paymentMethod) {
      return res
        .status(400)
        .json({ error: "ProductId, quantity, and paymentMethod são obrigatórios" });
    }

    if (typeof quantity !== "number" || quantity <= 0) {
      return res
        .status(400)
        .json({ error: "Quantidade deve ser um número positivo" });
    }

    const username = req.user.username;
    const checkout = checkoutService.processCheckout({
      username,
      productId,
      quantity,
      paymentMethod,
    });

    res.status(201).json(checkout);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getCheckouts = (req, res) => {
  const username = req.user.username;
  res.json(checkoutService.getUserCheckouts(username));
};
