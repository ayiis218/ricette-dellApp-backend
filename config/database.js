const { Pool } = require('pg')
require('dotenv').config()

/* console.log(process.env.DB_HOST)
console.log(process.env.DB_USER)
console.log(process.env.DATABASE)
console.log(process.env.DB_PASS)
console.log(process.env.DB_PORT) */

const conn = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DATABASE,
  pass: process.env.DB_PASS,
  port: process.env.DB_PORT
}) 

conn.connect((err) => {
  if (err) {
    console.log(err)
  }
})

module.exports = conn