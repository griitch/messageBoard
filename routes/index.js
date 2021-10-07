const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("index", {
    title: "Members only Message Board",
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
