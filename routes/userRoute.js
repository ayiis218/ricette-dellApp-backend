const express = require('express')
const Router = express.Router()

const controller = require('../controllers/userControllers')
const userImages = require('../middlewares/userImages')


Router.get('/', controller.allUser)
Router.get('/users/id', controller.UserId)
Router.post('/users/add', userImages.uploadImages, controller.createUser)
Router.put('/users/update/id', userImages.uploadImages, controller.updateUser)
/*Router.put('/users/update/id', controller.updatePhoto)
Router.put('/users/update/id', controller.updatepass) */
Router.delete('/user/delete/id', controller.deleteUser)

module.exports = Router