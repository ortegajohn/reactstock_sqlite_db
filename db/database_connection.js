// const mysql = require('mysql');
// const mysql = require('mysql2');
const sqlite3 = require('sqlite3').verbose();
const colors = require('colors');
const { promisify } = require('util');

const { keys } = require('./database_keys');

// const database = mysql.createPool(keys);
// const database = mysql.createConnection(keys);
let database = new sqlite3.Database('D:/Bootcamp/reactstock/db/istock_db.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the chinook database.');
  });

  database.serialize(() => {
    database.each(`SELECT id as id,
                    ticker as ticker
             FROM stocks`, (err, row) => {
      if (err) {
        console.error(err.message);
      }
      console.log(row.id + "\t" + row.name);
    });
  });
  
// database.getConnection((errors, connection) => {
//     database.getConnection((errors, connection) => {
//     console.log("GOTHERE2")

//     if (connection) {

//         connection.release();
//         console.log(colors.yellow('DB is Connected Successfully'));

//     } else {

//         console.log(colors.red("DB Connection is Wrong" + errors));

//     }
// });

/* Promisify Pool Queries */
// database.query = promisify(database.query);
database.get = promisify(database.get);
// database.run = promisify(database.run);

module.exports = database;