const express = require("express");
const router = express.Router();

const messages = [
  {
    text: "hello world",
    user: "john doe",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
  {
    text: "lorem ipsum!",
    user: "harit",
    added: new Date(),
  },
];

router.get("/", (req, res, next) => {
  res.render("index", {
    title: "Mini Message Board",
    messages,
  });
});

router.get("/new", (req, res) => {
  res.render("form", {
    title: "Send a message",
  });
});

router.post("/new", (req, res) => {
  const { user, text } = req.body;
  messages.push({ user, text, added: new Date() });
  res.redirect("/");
});

module.exports = router;
