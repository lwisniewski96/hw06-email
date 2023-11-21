const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();

const secret = "secret word";
const users = [
  { id: 23, name: "Łukasz", email: "mango@tws.pl" },
  { id: 46, name: "Doma", email: "banan@tws.pl" },
];
app.get("/", (req, res) => {
  res.send("Witaj na stronie głównej");
});

app.get("/admin", (req, res) => {
  res.send("Witaj w panelu admina");
});

app.post("/login", (req, res) => {
  const user = users.find((u) => u.email === req.body.email);
  if (!users) {
    return res.sendStatus(401);
  }
  const payload = user;
  const token = jwt.sign(payload, secret);
  res.json({ token });
});

app.listen(300, () => console.log("Server słucha..."));
