const express = require('express')
const Router = express.Router()

const {upload} = require('../middlewares/userImages')
const {checkToken} = require('../middlewares/auth')
const {
    allUser,
    UserId, 
    createUser, 
    updateUser, 
    deleteUser
} = require('../controllers/userControllers')


Router.get('/users', allUser)
Router.get('/users/id', UserId)
Router.post('/users/add', checkToken, upload, createUser)
Router.put('/users/update/id', checkToken, upload, updateUser)
Router.delete('/user/delete/id', checkToken, deleteUser)
/*Router.put('/users/update/id', controller.updatePhoto)
Router.put('/users/update/id', controller.updatepass) */

module.exports = Router