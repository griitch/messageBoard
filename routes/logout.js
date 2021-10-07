const express = require("express");
const Router = express.Router();

Router.get("/", (req, res, next) => {
  if (req.user) {
    req.logOut();
  }
  res.redirect("/");
});

module.exports = Router;
