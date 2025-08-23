const transferService = require("../service/transferService");

exports.createTransfer = (req, res) => {
  try {
    const { from, to, amount } = req.body;
    if (!from || !to || typeof amount !== "number") {
      return res
        .status(400)
        .json({ error: "Remetente, destinatário e valor são obrigatórios" });
    }
    const transfer = transferService.createTransfer({ from, to, amount });
    res.status(201).json(transfer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getTransfers = (req, res) => {
  res.json(transferService.getAllTransfers());
};
