const userService = require("../service/userService");
const jwt = require("jsonwebtoken");

exports.register = (req, res) => {
  try {
    const { username, password, favorecido } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Usuário e senha são obrigatórios" });
    }
    const user = userService.registerUser({ username, password, favorecido });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Usuário e senha são obrigatórios" });
    }
    const user = userService.authenticateUser(username, password);
    const token = jwt.sign({ username: user.username }, "supersecret", {
      expiresIn: "1h",
    });
    res.json({ message: "Login realizado com sucesso", token });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

exports.getUsers = (req, res) => {
  res.json(userService.getAllUsers());
};
