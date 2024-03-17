const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true,
});

module.exports = pool; 