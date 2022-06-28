const express = require('express')
const Router = express.Router()

const middlewareAuth = require('../middlewares/auth')
const userImages = require('../middlewares/userImages')
const controllers = require('../controllers/authControllers') 

Router.post('/register', userImages.uploadImages, controllers.register )
Router.post('/login', controllers.login )

module.exports = Router