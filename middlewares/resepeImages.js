const multer = require('multer')
const path = require('path')

const file = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'picture/user');
    
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
}).single('images')

const uploadfile = (req, res, next) => {
  upload(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        res.status(401).send('failed', 'image to large, max size is 2MB!');
      }
        if (err) {
          res.status(401).send('failed', err.message);
        }
      return next()
  })
}

module.exports = uploadfile


// const uploadfile = multer({ storage: file })