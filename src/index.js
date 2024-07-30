const express = require("express");
const bcrypt = require("bcrypt");
const path = require("path");
const { Template, name } = require("ejs");
const app = express();
const port = 3000;
const collection = require("./config.js");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// for Template engine
app.set("view engine", "ejs");
// for statics files
app.use(express.static("public"));
// get handlers
app.get("/", (req, res) => {
  res.redirect("/login");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});
app.get("/home", (req, res) => {
  res.render("home");
});
// post handlers
app.post("/signup", async (req, res) => {
  const data = {
    name: req.body.username,
    password: req.body.password,
  };
  const existingUser = await collection.findOne({ name: data.name });
  if (existingUser) {
    res.send("user already exist");
  } else {
    // hashin the password
    const saltrounds = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltrounds);
    data.password = hashedPassword;
    const userdata = await collection.insertMany(data);
    res.redirect("/home");
  }
});
app.post("/login", async (req, res) => {
  try {
    const check = await collection.findOne({ name: req.body.username });
    if (!check) {
      res.send("user can not found");
    }
    const ispasswordmatch = await bcrypt.compare(
      req.body.password,
      check.password
    );
    if (ispasswordmatch) {
      res.redirect("/home");
    } else {
      res.send("user or password is wrong");
    }
  } catch {
    res.send("wrong details");
  }
});
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
