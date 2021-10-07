const express = require("express");
const Router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");

Router.get("/", (req, res, next) => {
  if (req.user) res.redirect("/");
  else {
    res.render("register", { title: "Register", error: null });
  }
});

Router.post("/", async (req, res) => {
  try {
    const isAlreadyExisting = await User.findOne({
      username: req.body.username,
    });
    if (isAlreadyExisting) {
      res.render("register", {
        title: "Register",
        error: "This username already exists",
      });
    } else {
      const hash = await bcrypt.hash(req.body.password, 5);
      const newuser = new User({
        username: req.body.username,
        passwordHash: hash,
      });
      await newuser.save();
      res.redirect("/log-in");
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = Router;
