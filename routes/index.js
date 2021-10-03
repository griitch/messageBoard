const express = require("express");
const router = express.Router();

const messages = [
  {
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    user: "john doe",
    added: new Date(),
  },
  {
    text: "Dolores esse ducimus nostrum quisquam iure ullam",
    user: "Bob",
    added: new Date(),
  },
  {
    text: "doloribus asperiores nisi aperiam eaque alias dolore pariatur",
    user: "Eve",
    added: new Date(),
  },
  {
    text: "Nemo alias at quis modi. Illum, iste!",
    user: "Alice",
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
