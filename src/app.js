require("dotenv").config();

const express = require("express");
const fs = require("fs");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");

// Function imports
const { ensureDatabaseExists } = require("./utils/fileHandler");
const { addUser } = require("./utils/userHandler");

// Define the file path (data/users.sqlite)
const filePath = path.resolve("data", "users.sqlite");

// Function to check if the database file exists
function fileExists(filePath) {
  return fs.existsSync(filePath);
}

// Ensure the database and table exist before adding users
if (fileExists(filePath)) {
  console.log("Database file exists. Proceeding with user setup...");
} else {
  // Ensure the database and table exist before adding users
  ensureDatabaseExists(filePath)
  .then(() => {
    return Promise.all([
      addUser("admin", "1234", "admin", "admin@example.com"),
      addUser("user", "1234", "user", "user@example.com"),
    ]);
  })
  .then(() => {
    console.log("Default users added.");
  })
  .catch((err) => {
    console.error("Database setup error:", err);
  });
}

// App resources
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Session
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
  })
);

// Routes
app.use("/", require("./routes/home"));
app.use("/learning", require("./routes/learning"));
app.use("/login", require("./routes/auth"));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
