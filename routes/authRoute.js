const express = require('express')
const Router = express.Router()

// const middlewareAuth = require('../middlewares/auth')
const {upload} = require('../middlewares/userImages')
const {register, login} = require('../controllers/authControllers') 

Router.post('/register', upload, register )
Router.post('/login', login )

module.exports = Router