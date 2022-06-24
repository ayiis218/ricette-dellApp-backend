const express = require('express')
const Router = express.Router()
const multer = require('multer')
const path = require('path')

const controller = require('../controllers/recipeControllers')

const file = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'picture');
	},
	filename: (req, file, cb) => {
		cb(null, new Date().getTime() + '-' + file.originalname)
	},
})

const upload = multer({ storage: file })

Router.get('/recipe/all', controller.allRecipe)
Router.get('/recipe/id', controller.recipeId)
Router.get('/recipe/name', controller.recipeName)
Router.get('/recipe/latest', controller.latestRecipe)
Router.get('/recipe', controller.pagination)
Router.post('/recipe/add', upload.single('images'), controller.createRecipe)
Router.put('/recipe/update/id', upload.single('images'), controller.updateRecipe)
Router.delete('/recipe/delete/id', controller.deletRecipe)
// router.get('/recipe/myRecipe', controller.myRecipe)
// Router.get('/recipe/list', controller.listRecipe)


module.exports = Router
