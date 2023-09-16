const mysql = require('mysql2');
const client = require('.');
const config = require("./config");
const chalk = require('chalk')

if(config.db.status != true)return;
const db = mysql.createConnection({
    host: config.db.ip,
    user: config.db.hn,
    password: config.db.dp,
    database: config.db.dn
});
db.connect((err) => {
    if (err) {
        console.error(chalk.red ('Error connecting to the database:', err.message));
    } else {
        console.log(chalk.green('Database connected successfully.'));
    }
});


module.exports = db;
