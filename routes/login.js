const express = require("express");
const passport = require("passport");
const Router = express.Router();

Router.get("/", (req, res, next) => {
  if (req.user) res.redirect("/");
  else res.render("loginform", { title: "login", error: false });
});

Router.post("/", (req, res, next) => {
  req._passport.instance.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.render("loginform", { title: "login", error: true });
    }
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.redirect("/");
    });
  })(req, res, next);
});

module.exports = Router;
