const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

// Login Route
router.get("/", (req, res) => {
  if (req.session.userId) {
    return res.redirect("/");
  }

  res.render("login");
});

router.post("/", async (req, res) => {
  const { user_name, password } = req.body;
  const user = await User.findOne({ where: { user_name } });

  if (!user || !(await bcrypt.compare(password, user.user_password))) {
    return res.send("Invalid username or password!");
  }

  req.session.userId = user.user_id;
  // console.log("Session after login:", req.session); // Debugging
  res.redirect("/");
});

module.exports = router;