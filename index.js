const express = require('express')
const cors = require('cors')
const xss = require('xss-clean')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')

// const Router = require ('./routes/routes')
const userRoute = require('./routes/userRoute')
const recipeRoute = require('./routes/recipeRoute')
const commentRoute = require('./routes/commentRoute')

const port = process.env.PORT || 8080
const app = express()

const option = {
  origin: 'http://localhost:8080'
}
app.use(cors(option))

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

app.use(xss())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: false
  })
)

// app.use('/', Router)
app.use(userRoute)
app.use(recipeRoute)
app.use(commentRoute)
app.use('/*', (req, res) => {
  res.status(404).send('Path not found')
})
