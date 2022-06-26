const express = require('express')
const Router = express.Router()

const controllers = require('../controllers/commentControllers')

Router.get('/comment', controllers.allComment)
Router.get('/comment/id', controllers.getCommentId)
Router.post('/comment/add', controllers.createComment)
Router.put('/comment/update/id', controllers.updateComment)
Router.delete('/comment/delete/id', controllers.deleteComment)
// Router.get(`/comment/:id`, controllers.getCommentByRecipe)

module.exports = Router