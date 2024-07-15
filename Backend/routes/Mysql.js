// db.js
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user:'root',
  password:'root',
  database: 'ProductStore'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    throw err;
  }
  console.log('Connected to MySQL database');

  // Create users table if not exists
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS Users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      cart JSON
    )
  `;

  connection.query(createTableQuery, (err, result) => {
    if (err) {
      console.error('Error creating users table:', err);
      throw err;
    }
    console.log('Users table created or already exists');
  });
});


module.exports = connection;
