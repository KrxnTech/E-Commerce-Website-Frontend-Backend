const mysql = require('mysql2')
require('dotenv').config({ path: '../config/dbConfig.env' })

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
})

pool.getConnection((err, connection) => {
  if (err) {
    console.log("Database connection failed:", err)
  } else {
    console.log("MySQL Connected Successfully!")
    connection.release()
  }
})

module.exports = pool.promise()
