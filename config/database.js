const { Pool } = require('pg')
const dotenv = require('dotenv')
dotenv.config()
// console.log(proses.env)

const conn = new Pool({
  host: process.env.HOST,
  user: 'postgres',
  database: 'pijarcamp',
  password: process.env.PASSWORD,
  port: process.env.PORT
})

conn.connect((err) => {
  if (err) {
    console.log(err)
  }
})

module.exports = conn
