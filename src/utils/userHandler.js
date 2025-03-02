require("dotenv").config();
const bcrypt = require("bcrypt");
const User = require("../models/User");

async function addUser(username, password, role, email) {
  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      user_name: username,
      user_password: hashedPassword,
      user_role: role,
      email: email,
    });

    console.log("User created:", user.toJSON());
  } catch (error) {
    console.error("Error creating user:", error);
  }
}

module.exports = { addUser }
