const express = require('express')
const Router = express.Router()
const multer = require('multer')
const path = require('path')

const controller = require('../controllers/userControllers')
const userImages = require('../middlewares/userImages')

/* const file = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'picture');
		
	},
	filename: (req, file, cb) => {
		cb(null, new Date().getTime() + '-' + file.originalname)
	},
})

const upload = multer({
	file,
	limits: { fileSize: 2 * 1024 * 1024 },
	fileFilter: (req, file, cb) => {
		const ext = path.extname(file.originalname).toLowerCase()
		let type = ext === '.jpg' || ext === '.png' || ext === '.webp'
		if (!type) {
			cb(null, false)
			return cb(new Error('file must be type jpg or png'))
		}
		return cb(null, true)
	},
  }).single('photo')
  

const uploadfile = multer({ storage: file }) */

Router.get('/', controller.allUser)
Router.get('/users/id', controller.UserId)
Router.post('/users/add', userImages, controller.createUser)
Router.put('/users/update/id', userImages, controller.updateUser)
/* // Router.put('/users/update/id', controller.updatePhoto)
// Router.put('/users/update/id', controller.updatepass) */
Router.delete('/user/delete/id', controller.deleteUser)

module.exports = Router
