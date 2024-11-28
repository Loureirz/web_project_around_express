const { Router } = require("express");
const fs = require("fs");
const path = require("path");
const router = new Router();

router.get("/", (req, res) => {
  const filePath = path.join(__dirname, "../data/users.json");
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.status(404).json({ message: 'Erro ao carregar usuários' });
    } else {
      res.json(JSON.parse(data));
    }
  });
});

router.get("/:id", (req, res) => {
  const userId = req.params.id;
  const filePath = path.join(__dirname, "../data/users.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(404).json({ message: "Erro ao carregar usuários" });
    }

    try {
      const users = JSON.parse(data);
      const user = users.find((u) => u._id === userId);

      if (!user) {
        return res.status(404).json({ message: "ID do usuário não encontrado" });
      }

      res.json(user);
    } catch (error) {
      res.status(404).json({ message: "Erro ao processar os dados do usuário" });
    }
  });
});


module.exports = router;