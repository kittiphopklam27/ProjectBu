require("dotenv").config();

const express = require('express');
const session = require("express-session");
const bodyParser = require('body-parser');
const path = require('path');

// Function
const { ensureDatabaseExists } = require('./utils/fileHandler');

// Define the file path (data/users.sqlite)
const filePath = path.join(__dirname, 'data', 'users.sqlite');

const  tableName = `user`;
const tableSchema = `
  user_id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_name VARCHAR(255) NOT NULL,
  user_password VARCHAR(255) NOT NULL,
  user_role VARCHAR(50) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  user_created_time DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
  user_updated_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
`;

// Ensure the file exists
ensureDatabaseExists(filePath, tableName, tableSchema);

// App resources
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Session
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
  })
);

// Routes
app.use('/', require('./routes/home'));
app.use('learning', require('./routes/learning'));
app.use('/login', require('./routes/auth'));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});