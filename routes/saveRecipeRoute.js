const express = require('express')
const Router = express.Router()

const {tokenVerify} = require('../middlewares/auth')
const {
    allSave,
    createSave, 
    deleteSave,
} = require('../controllers/saveRecipeControllers')

Router.get('/save', tokenVerify, allSave)
Router.post('save/create', tokenVerify, createSave)
Router.delete('/save/delete', tokenVerify, deleteSave)