require('dotenv').config()
const mysql = require('mysql2')

// create the pool
const opts = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  rowsAsArray: false,
  multipleStatements: true
}
const pool = mysql.createPool(opts)

// now get a Promise wrapped instance of that pool
const promisePool = pool.promise()

module.exports = {
  query: (text, params) => promisePool.query(text, params)
}
