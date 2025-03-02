const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");
const path = require("path");

const sql = `
CREATE TABLE IF NOT EXISTS user (
  user_id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_name VARCHAR(255) NOT NULL,
  user_password VARCHAR(255) NOT NULL,
  user_role VARCHAR(50) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  user_created_time DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
  user_updated_time DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
);
`;

function ensureDatabaseExists(dbPath) {
  return new Promise((resolve, reject) => {
    const dir = path.dirname(dbPath);

    // Ensure the directory exists
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Connect to SQLite database (creates if not exists)
    const db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error("Error opening database:", err.message);
        return reject(err);
      }
      console.log("Connected to SQLite database.");

      // Create the user table
      db.run(sql, (err) => {
        if (err) {
          console.error("Error creating table:", err.message);
          return reject(err);
        }
        console.log("Table 'user' ensured.");
        db.close(); // Close the database connection
        resolve();
      });
    });
  });
}

module.exports = { ensureDatabaseExists };
