require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const strategy = require("./localstrategy");

const indexRouter = require("./routes/index");
const registerRouter = require("./routes/register");
const logoutRouter = require("./routes/logout");
const loginRouter = require("./routes/login");
const sendmessageRouter = require("./routes/sendmessage");

const User = require("./models/user");

const app = express();

const port = process.env.PORT || 8000;
const mongoDb = process.env.mongoDb;

// uasing the same db connection for the app and for the session store
const dbCnx = mongoose
  .connect(mongoDb)
  .then((cnx) => {
    console.log("connection with mongodb established");
    return cnx.connection.getClient();
  })
  .catch(console.log);

const sessionStore = MongoStore.create({
  collectionName: "session-stuff",
  clientPromise: dbCnx,
});

// setting up passport
passport.use(strategy);
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id, done);
});

app.use(
  session({
    secret: process.env.secret,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 day
  })
);

app.use(passport.initialize());
app.use(passport.session());

// setting up view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// parsing requests and static files middlewre
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// making the currentUser available for all views
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

// routing
app.use("/", indexRouter);
app.use("/register", registerRouter);
app.use("/log-in", loginRouter);
app.use("/logout", logoutRouter);
app.use("/sendmessage", sendmessageRouter);

// catching 404
app.use(function (req, res) {
  // console.log(req._passport.instance.authenticate === passport.authenticate); >> true
  res.send("<h2>404 not found</h2>");
  // change this a proper 404 view
});

app.listen(port, () => console.log(`server listening on port : ${port}`));
