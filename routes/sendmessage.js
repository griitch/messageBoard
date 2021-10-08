const express = require("express");
const Router = express.Router();
const { body } = require("express-validator");
const Message = require("../models/message");
const User = require("../models/user");

Router.get("/", (req, res, next) => {
  if (!req.user) res.redirect("/log-in");
  else res.render("sendmessage", { title: "Send a message" });
});

Router.post("/", body("message").trim().escape(), async (req, res, next) => {
  const newMessage = new Message({
    message: req.body.message,
    user: req.user._id,
  });
  await newMessage.save();
  res.redirect("/");
});

module.exports = Router;
