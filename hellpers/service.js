const mysql = require('mysql2/promise');

// Create a pool for better performance
const pool = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'root',           // or your mysql username
  password: '',           // your mysql password (if any)
  database: 'astronacci', // your database name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
