const express = require('express')
const Router = express.Router()

const {upload} = require('../middlewares/recipeImages')
// const {uploadV} = require('../middlewares/recipeVideos')
const {checkToken} = require('../middlewares/auth')
const {
    allRecipe,
    recipeId,
    recipeName,
    latestRecipe,
    pagination,
    createRecipe,
    updateRecipe, 
    deletRecipe
} = require('../controllers/recipeControllers')


Router.get('/recipe/all', allRecipe)
Router.get('/recipe/id', recipeId)
Router.get('/recipe/name', recipeName)
Router.get('/recipe/latest', latestRecipe)
Router.get('/recipe', pagination)
Router.post('/recipe/add', checkToken, upload, createRecipe)
Router.put('/recipe/update/id', checkToken, upload, updateRecipe)
Router.delete('/recipe/delete/id', checkToken, deletRecipe)
// router.get('/recipe/myRecipe', controller.myRecipe)

module.exports = Router