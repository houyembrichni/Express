const express = require("express");
const server = express();
server.use(express.static("public"));
server.set("view engine", "ejs");
server.set("views", "./views");
server.use((req, res, next) => {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();
  const isonservice = day >= 1 && day <= 5 && hour >= 9 && hour < 17;

  if (isonservice) {
    next();
  } else {
    res.status(500).render("offService");
  }
});
server.get("/", (req, res) => {
  res.render("home");
});
server.get("/services", (req, res) => {
  res.render("services");
});
server.get("/contact", (req, res) => {
  res.render("contact");
});
server.listen(3000, (err) => {
  err ? console.log(err) : console.log("lisening on port 3000");
});
