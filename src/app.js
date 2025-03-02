const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Function
const { ensureFileExists } = require('./utils/fileHandler')

// Define the file path (data/users.sqlite)
const filePath = path.join(__dirname, 'data', 'users.sqlite')

// Ensure the file exists
ensureFileExists(filePath);

// App resources
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Routes
app.use('/', require('./routes/home'));
app.use('learning', require('./routes/learning'));
app.use('/login', require('./routes/login'));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});