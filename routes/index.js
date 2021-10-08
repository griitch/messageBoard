const express = require("express");
const router = express.Router();
const Message = require("../models/message");

router.get("/", async (req, res, next) => {
  const messages = await Message.find({})
    .sort({ createdAt: -1 })
    .populate("user");

  res.render("index", {
    title: "Members only Message Board",
    messages,
  });
});

module.exports = router;
