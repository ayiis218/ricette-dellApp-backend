const express = require('express');
const Router = express.Router();

const { upload } = require('../middlewares/recipeImages');
// const {uploadV} = require('../middlewares/recipeVideos')
const { tokenVerify } = require('../middlewares/auth');
const {
   listRecipe,
   allRecipe,
   recipeId,
   recipeName,
   recipeSearch,
   myRecipe,
   latestRecipe,
   pagination,
   createRecipe,
   updateRecipe,
   deleteRecipe,
} = require('../controllers/recipeControllers');

Router.get('/recipes', listRecipe);
Router.get('/recipe/all', allRecipe);
Router.get('/recipe/name', recipeName);
Router.get('/recipe/latest', latestRecipe);
Router.get('/recipe', pagination);
Router.post('/recipe/add', upload, createRecipe);
Router.get('/recipe/:id', recipeId);
Router.get('/search/:name', recipeSearch);
Router.get('/myrecipe/:id', myRecipe);
Router.put('/recipe/update/:id', tokenVerify, upload, updateRecipe);
Router.delete('/recipe/delete/:id', tokenVerify, deleteRecipe);
// router.get('/recipe/myRecipe', controller.myRecipe)

module.exports = Router;
