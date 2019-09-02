require("dotenv").config();
const PORT = process.env.PORT || 3000;

const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const flash = require("connect-flash");
const session = require("express-session");
const config = require("./config");

const app = express();

// Passport Config
require("./config/passport")(passport);

// Connect to MongoDB
const connection = connect();
connection
  .on("error", console.error)
  .on("disconnected", connect)
  .once("open", listen);

function listen() {
  if (app.get("env") === "test") return;
  app.listen(PORT, function() {
    // Browser Refresh

    if (process.send) {
      process.send({ event: "online", url: `http://localhost:${PORT}/` });
    }
  });
  console.log("Express app started on port " + PORT);
}

function connect() {
  var options = { keepAlive: 1, useNewUrlParser: true };
  mongoose.connect(config.db, options);
  console.log("CONNECTED", config.db);
  return mongoose.connection;
}

app.set("view engine", "pug");
app.set("views", "./app/views");

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  console.log(res.locals);
  if (process.env.NODE_ENV === "development") {
    res.locals.browserRefreshURL = process.env.BROWSER_REFRESH_URL;
  }
  next();
});

// Routes
app.use("/", require("./routes/index.js"));
app.use("/users", require("./routes/users.js"));
