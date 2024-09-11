const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const web = require("./routes/web");

//connect flash and sessions
const session = require("express-session");
const flash = require("connect-flash");
//messages
app.use(
  session({
    secret: "secret",
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
  })
);
//Flash messages
app.use(flash());

//Database Connection
const localUrl = "mongodb://127.0.0.1:27017/user";
const connectDb = () => {
  return mongoose
    .connect(localUrl)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.log(err);
    });
};
connectDb();

// cookies
const cookieparser = require("cookie-parser");
app.use(cookieparser());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static("public"));

// Alternatively, you can use express's built-in body-parser
app.use(express.urlencoded({ extended: true }));

// Middleware for JSON data (in case you handle JSON)
app.use(express.json());

app.use("/", web);

app.listen(3000, () => {
  console.log("App is listening");
});
