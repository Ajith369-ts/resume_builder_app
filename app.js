require('dotenv').config()
const express = require("express");
const path = require("path");

const mongoose = require("mongoose");

const app = express();

const ejs = require("ejs");

const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// User modal
const User = require("./models/user");

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const resumeAppRoutes = require("./routes/resume-app");
const detailsRoutes = require("./routes/details");
const authRoutes = require("./routes/auth");
const errorRoute = require("./routes/404error");

app.use(resumeAppRoutes);
app.use(detailsRoutes);
app.use(authRoutes);
app.use(errorRoute);

app.get("/", (req, res, next) => {
  res.send("<h1>Hello</h1>");
});


let port = process.env.PORT;
if(port == null || port == ""){
    port = 3000;
}

const localUrl = `mongodb://localhost:27017/${process.env.MONGO_DB_NAME}`;

mongoose
  .connect(localUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then((result) => {
    app.listen(3000, () => {
      console.log("server running on port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
