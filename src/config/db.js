const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'portfolio_db'
});

module.exports = db;
