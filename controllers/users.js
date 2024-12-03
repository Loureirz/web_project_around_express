const mongoose = require("mongoose");
const User = require("../models/user");

const listUsers = (req, res) => {
  User.find().then((users) => {
    res.json(users);
  });
};

const getUserById = (req, res) => {
  const userId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: "ID inválido" });
  }

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }
      res.json(user);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  console.log("Dados recebidos na requisição:", req.body);

  User.create({ name, about, avatar })
    .then((user) => {
      console.log("Usuário criado com sucesso:", user);
      res.status(201).json({
        message: 'Usuário criado com sucesso',
        user,
      });
    })
    .catch((err) => {
      console.error("Erro ao criar usuário:", err);
      if (err.name === 'ValidationError') {
        const errors = Object.keys(err.errors).map((key) => err.errors[key].message);
        return res.status(400).json({ error: "Erro de validação", details: errors });
      }
      res.status(500).json({ error: err.message });
    });
};

const updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(
    userId,
    { name, about },
    { new: true, runValidators: true }
  )
    .then((updatedUser) => {
      if (!updatedUser) {
        const error = new Error("Usuário não encontrado");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json(updatedUser);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).json({ error: "Dados inválidos", details: err.message });
      }
      next(err);
    });
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(
    userId,
    { avatar },
    { new: true, runValidators: true }
  )
    .then((updatedUser) => {
      if (!updatedUser) {
        const error = new Error("Usuário não encontrado");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json(updatedUser);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).json({ error: "Dados inválidos", details: err.message });
      }
      next(err);
    });
};


module.exports = { listUsers, getUserById, createUser, updateProfile, updateAvatar };