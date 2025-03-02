const fs = require('fs');
const path = require('path');

// Function to ensure the file exists
function ensureFileExists(filePath, defaultContent = '[]') {
  const dir = path.dirname(filePath);

  // Create directories along the path if they don't exist
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Create the file if it doesn't exist
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, defaultContent, 'utf8');
  }
}

module.exports = { ensureFileExists };