const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadPath = path.join(__dirname, '..', 'frontend', 'public');

    if (req.path.includes('uploadProfileImage')) {
      const userId = req.body.userId;
      uploadPath = path.join(uploadPath, 'images', 'profile', userId);
    } else if (req.path.includes('uploadServiceImage')) {
      const serviceId = req.body.serviceId;
      uploadPath = path.join(uploadPath, 'images', 'services', serviceId);
    }

    console.log(`Creating directory: ${uploadPath}`);
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    console.log(`Saving file: ${file.originalname}`);
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

module.exports = { upload };