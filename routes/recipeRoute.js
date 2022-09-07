const express = require('express');
const Router = express.Router();

const { upload } = require('../middlewares/recipeImages');
const { tokenVerify } = require('../middlewares/auth');
const {
   listRecipe,
   allRecipe,
   recipeId,
   recipeSearch,
   myRecipe,
   latestRecipe,
   pagination,
   createRecipe,
   updateRecipe,
   deleteRecipe,
} = require('../controllers/recipeControllers');

Router.get('/recipes', listRecipe);
Router.get('/search', recipeSearch);
Router.get('/recipe/all', allRecipe);
Router.get('/recipe/latest', latestRecipe);
Router.get('/recipe', pagination);
Router.post('/recipe/add', upload, createRecipe);
Router.get('/recipe/:id', recipeId);
Router.get('/myrecipe/:id', myRecipe);
Router.put('/recipe/update/:id', tokenVerify, upload, updateRecipe);
Router.delete('/recipe/delete/:id', tokenVerify, deleteRecipe);

module.exports = Router;
