const sqlite3 = require('sqlite3').verbose();
const fs = require('fs')
const path = require('path');

function ensureDatabaseExists(dbPath, tableName, tableSchema) {
  const dir = path.dirname(dbPath);

  // Ensure the directory exists
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Connect to the SQLite database (creates if not exists)
  const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error('Error opening database:', err.message);
    } else {
      console.log('Connected to SQLite database.');
      db.run(
        `CREATE TABLE IF NOT EXISTS ${tableName} (${tableSchema})`,
        (err) => {
          if (err) {
            console.error('Error creating table:', err.message);
          } else {
            console.log(`Table '${tableName}' ensured.`);
          }
        }
      );
    }
  });

  return db;
}

module.exports = { ensureDatabaseExists };
