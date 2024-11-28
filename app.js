const express = require("express");
const usersRouter = require("./routes/users.js");
const cardsRouter = require("./routes/cards.js");

const { PORT = 3000 } = process.env;
const app = express();

app.use("/users", usersRouter);
app.use("/cards", cardsRouter);

app.use((req, res) => {
  res.status(500).json({ message: "A solicitação não foi encontrada" });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
