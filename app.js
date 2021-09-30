require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const logger = require("morgan");
const port = process.env.PORT || 8000;
const { dbUsername, dbPassword } = process.env;
const mongoDB = `mongodb+srv://${dbUsername}:${dbPassword}@cluster0.gsfsu.mongodb.net/library?retryWrites=true&w=majority`;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const indexRouter = require("./routes/index");
const newRouter = require("./routes/new");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/new", newRouter);

app.use(function (req, res) {
  res.send("<h2>404 not found</h2>");
});

app.listen(port);
