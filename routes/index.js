const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  // db call
  res.render("index", {
    title: "Members only Message Board",
    // showUsernames : true or false
  });
});

module.exports = router;
