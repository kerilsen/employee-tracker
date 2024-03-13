const mysql = require('mysql2/promise');
require('dotenv').config();

const db = async () => {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            multipleStatements: true,
        });
        console.log('Database connected to: ', process.env.DB_NAME);
        return connection;
    } catch (error) {
        console.error('Error connecting to MySQL: ', error);
        throw error;
    }
};

module.exports = db; 