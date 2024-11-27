const { Router } = require("express");
const fs = require("fs");
const path = require("path");
const router = new Router();

router.get("/cards", (req, res) => {
  const filePath = path.join(__dirname, "../data/cards.json");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      res.status(404).json({ message: 'Erro ao carregar cards' })
    } else {
      res.json(JSON.parse(data));
    }
  })
});

module.exports = router;
