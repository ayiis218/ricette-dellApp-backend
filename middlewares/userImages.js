const multer = require('multer');
const path = require('path');

const file = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, './picture/user');
   },

   filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const fileName = `${Date.now()}_${Math.random()}_${ext}`;
      cb(null, fileName);
   },
});

const uploadImages = multer({
   storage: file,
   limits: { fileSize: 2 * 1024 * 1024 },
   fileFilter: (req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase();
      let type =
         ext === '.jpg' || ext === '.png' || ext === '.webp' || ext === '.jpeg';
      if (!type) {
         cb(null, false);
         return cb(new Error('file must be type jpg png webp or jpeg'));
      }
      return cb(null, true);
   },
}).single('photo');

const upload = (req, res, next) => {
   uploadImages(req, res, (err) => {
      if (err instanceof multer.MulterError) {
         return res.status(400).send(err?.message ?? '');
      }
      if (err) {
         return res.status(400).send(err?.message ?? '');
      }
      next();
   });
};

module.exports = { uploadImages, upload };
