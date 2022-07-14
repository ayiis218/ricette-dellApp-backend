const express = require('express')
const cors = require('cors')
const xss = require('xss-clean')
const helmet = require('helmet')
const bodyParser = require('body-parser')
require('dotenv').config()

const port = process.env.PORT || 8120
const app = express()

/* const option = {
  origin: 'http://localhost:3000',
  optionSuccessStatus: 200
}
app.use(cors(option)) */

app.use(cors())
app.options('*', cors())
app.use(express.static('public'))

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
// app.use('/picture/recipe', express.static('picture'))
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