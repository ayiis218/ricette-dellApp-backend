const multer = require('multer')
const path = require('path')

const file = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'picture');
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname)
      const filename = `${Date.now()}${ext}`
      cb(null, filename)
    },
})

const upload = multer({
  file,
  limits: { fileSize: 2 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase()
      let type = ext === '.jpg' || ext === '.png' || ext === '.webp'
        if (type) {
          return cb(null, true);
        }
        cb(null, false)
        return cb(new Error('file must be type failed'))
    },
  }).single('photo')

    const uploadFile = (req, res, next) => {
      upload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
          res.status(401).send('failed', 'image to large, max size is 2MB!');
        }
        if (err) {
          res.status(401).send('failed', err.message)
        }
        res.status(404).send('Error code')
    })
}

module.exports = uploadFile;