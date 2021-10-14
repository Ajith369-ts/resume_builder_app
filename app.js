const express = require("express");
const path = require("path");

const mongoose = require("mongoose");

const app = express();

const ejs = require("ejs");

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

const resumeAppRoutes = require("./routes/resume-app");
const detailsRoutes = require("./routes/details");
const errorRoute = require("./routes/404error");

app.use(resumeAppRoutes);
app.use(detailsRoutes);
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
    useUnifiedTopology: true,
    useFindAndModify: false

  })
  .then((result) => {
    app.listen(3000, () => {
      console.log("server running on port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
