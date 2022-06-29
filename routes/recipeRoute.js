const express = require('express')
const Router = express.Router()

const controller = require('../controllers/recipeControllers')
const recipeImages = require('../middlewares/recipeImages')
const {checkToken} = require('../middlewares/auth')


Router.get('/recipe/all', controller.allRecipe)
Router.get('/recipe/id', controller.recipeId)
Router.get('/recipe/name', controller.recipeName)
Router.get('/recipe/latest', controller.latestRecipe)
Router.get('/recipe', controller.pagination)
Router.post('/recipe/add', recipeImages.upload, checkToken, controller.createRecipe)
Router.put('/recipe/update/id',recipeImages.upload, checkToken, controller.updateRecipe)
Router.delete('/recipe/delete/id', checkToken, controller.deletRecipe)
// router.get('/recipe/myRecipe', controller.myRecipe)

module.exports = Router