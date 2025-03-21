const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadPath = path.join(__dirname, '..', 'uploads', 'images');

    if (req.path.includes('upload/images/profile')) {
      const userId = req.body.userId;
      if (!userId) {
        return cb(new Error('userId is required'));
      }
      uploadPath = path.join(uploadPath, 'profile', userId);
    } else if (req.path.includes('upload/images/services')) {
      const serviceId = req.body.serviceId;
      if (!serviceId) {
        return cb(new Error('serviceId is required'));
      }
      uploadPath = path.join(uploadPath, 'services', serviceId);
    } else {
      return cb(new Error('Invalid upload path'));
    }

    // Crear el directorio si no existe
    fs.mkdirSync(uploadPath, { recursive: true });

    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

module.exports = { upload };