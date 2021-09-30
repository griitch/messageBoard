require("dotenv").config();
const express = require("express");
const path = require("path");
const port = process.env.PORT || 8000;
const indexRouter = require("./routes/index");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

app.use(function (req, res) {
  res.send("<h2>404 not found</h2>");
});

app.listen(port);
