const { transfers } = require("../model/transferModel");
const { findUserByUsername } = require("./userService");

function createTransfer({ from, to, amount }) {
  const sender = findUserByUsername(from);
  const recipient = findUserByUsername(to);
  if (!sender || !recipient) {
    throw new Error("Usuário remetente ou destinatário não encontrado");
  }
  if (!recipient.favorecido && amount >= 5000) {
    throw new Error(
      "Transferências acima de R$ 5.000,00 só podem ser feitas para favorecidos",
    );
  }
  const transfer = { from, to, amount, date: new Date() };
  transfers.push(transfer);
  return transfer;
}

function getAllTransfers() {
  return transfers;
}

module.exports = {
  createTransfer,
  getAllTransfers,
};
