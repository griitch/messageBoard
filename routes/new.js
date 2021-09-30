const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("form", {
    title: "Send a message",
  });
});

router.post("/", (req, res) => {});

module.exports = router;
