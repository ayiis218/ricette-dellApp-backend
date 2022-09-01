const express = require('express');
const Router = express.Router();

const { tokenVerify } = require('../middlewares/auth');
const {
   listComment,
   allComment,
   commentId,
   commentByRecipe,
   createComment,
   updateComment,
   deleteComment,
} = require('../controllers/commentControllers');

Router.get('/comments', listComment);
Router.get('/comment', allComment);
Router.get('/comment/:id', commentId);
Router.get('/comment/recipe/:id', commentByRecipe);
Router.post('/comment/add', tokenVerify, createComment);
Router.put('/comment/update/:id', tokenVerify, updateComment);
Router.delete('/comment/delete/:id', tokenVerify, deleteComment);
// Router.get(`/comment/:id`, controllers.commentByRecipe)

module.exports = Router;
