const express = require('express')
const cors = require('cors')
const xss = require('xss-clean')
const helmet = require('helmet')
const bodyParser = require('body-parser')
require('dotenv').config()

const port = process.env.APP_PORT || 8100
const app = express()

const option = {
  origin: 'http://localhost:8080',
  optionSuccessStatus: 200
}
app.use(cors(option))

app.use(xss())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: false
  })
)

// app.use(require ('./routes/routes'))
app.use(require('./routes/userRoute'))
app.use(require('./routes/recipeRoute'))
app.use(require('./routes/commentRoute'))
app.use(require('./routes/authRoute'))
app.use('/*', (req, res) => {
  res.status(404).send({error: '404', msg: `Path not found`})
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})