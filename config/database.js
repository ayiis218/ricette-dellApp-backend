const { Pool, Client } = require('pg')
require('dotenv').config()

let conn
if (process.env.ENV_MODE === 'prod') {
  conn = new Client({
    connectionString: process.env.DB_URI,
    ssl: { rejectUnauthorized: false }
  })
} else {
  conn = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DATABASE,
    pass: process.env.DB_PASS,
    port: process.env.DB_PORT
  })
}
 
conn.connect((err) => {
  if (err) {
    console.log(`not connected , ${err.message}`)
  }
  console.log(`application connected`)
})

module.exports = conn