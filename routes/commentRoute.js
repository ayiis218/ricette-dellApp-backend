const express = require('express')
const Router = express.Router()

const {checkToken} = require('../middlewares/auth')
const {
    allComment, 
    commentId, 
    createComment,
    updateComment, 
    deleteComment
} = require('../controllers/commentControllers')

Router.get('/comment', allComment)
Router.get('/comment/id', commentId)
Router.post('/comment/add', checkToken, createComment)
Router.put('/comment/update/id', checkToken, updateComment)
Router.delete('/comment/delete/id', checkToken, deleteComment)
// Router.get(`/comment/:id`, controllers.commentByRecipe)

module.exports = Router