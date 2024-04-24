require("dotenv").config();

const mysql = require("mysql");

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  charset: "utf8mb4", 
});

module.exports = {
  db,
};
