const multer = require('multer')
const path = require('path')

const file = multer.diskStorage({
	destination: (req, file, cb) => {
	  	cb(null, 'picture/recipe')
	},
  
	filename: (req, file, cb) => {
		const fileName = file.originalname.toLowerCase().split(' ').join('-')
		cb(null, fileName);
	},
  })

const uploadImages = multer({
	storage: file,
	limits: { fileSize: 2 * 1024 * 1024 },
	fileFilter: (req, file, cb) => {
		const ext = path.extname(file.originalname).toLowerCase()
		let type = ext === '.jpg' || ext === '.png' || ext === '.webp'
			if (!type) {
				cb(null, false)
				return cb(new Error('file must be type jpg or png'))
			}
			return cb(null, true)
  }
}).single('images')

  module.exports = { uploadImages }