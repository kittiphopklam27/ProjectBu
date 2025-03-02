const express = require("express");

const User = require("../models/User");

const router = express.Router();

app.get("/", async (req, res) => {
  if (!req.session.userId) {
    return res.redirect("/login");
  }

  const user = await User.findByPk(req.session.userId);
  res.render("home", { username: user.username });
});

module.exports = router;