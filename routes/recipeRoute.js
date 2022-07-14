const express = require('express')
const Router = express.Router()

const {upload} = require('../middlewares/recipeImages')
// const {uploadV} = require('../middlewares/recipeVideos')
const {tokenVerify} = require('../middlewares/auth')
const {
    allRecipe,
    recipeId,
    recipeName,
    latestRecipe,
    pagination,
    createRecipe,
    updateRecipe, 
    deleteRecipe
} = require('../controllers/recipeControllers')


Router.get('/recipe/all', allRecipe)
Router.get('/recipe/id', recipeId)
Router.get('/recipe/name', recipeName)
Router.get('/recipe/latest', latestRecipe)
Router.get('/recipe', pagination)
Router.post('/recipe/add', upload, createRecipe)
Router.put('/recipe/update/id', tokenVerify, upload, updateRecipe)
Router.delete('/recipe/delete/id', tokenVerify, deleteRecipe)
// router.get('/recipe/myRecipe', controller.myRecipe)

module.exports = Router