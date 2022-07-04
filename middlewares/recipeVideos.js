const multer = require('multer')
const path = require('path')

const file = multer.diskStorage({
	destination: (req, file, cb) => {
	  	cb(null, './picture/video')
	},
  
	filename: (req, file, cb) => {
		const ext = path.extname(file.originalname)
		const fileName = `${Date.now()}_${Math.random()}_${ext}`
		cb(null, fileName)
	},
  })

const uploadVideos = multer({
	storage: file,
	limits: { fileSize: 10 * 1024 * 1024 },
	fileFilter: (req, file, cb) => {
		const ext = path.extname(file.originalname).toLowerCase()
		let type = ext === '.mp4' || ext === '.avi' || ext === '.mpg'
			if (!type) {
				cb(null, false)
				return cb(new Error('file must be type mp4 avi or mpg'))
			}
			return cb(null, true)
  }
}).single('video')

const uploadV = (req, res, next) => {
	uploadVideos(req, res, (err) => {
			if (err instanceof multer.MulterError) {
				return res.status(400).send(err?.message ?? '')
			} 
			if (err) {
				return res.status(400).send(err?.message ?? '')
			}
		next()
	})
}

  module.exports = { uploadVideos, uploadV }