const multer = require("multer");
const { getUploadPath } = require("../utils/fileStorage.js");

// Multer genérico para usuarios y servicios
function makeMulter(entity) {
  return multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        const { dir } = getUploadPath({ entity, originalname: file.originalname });
        cb(null, dir);
      },
      filename: function (req, file, cb) {
        const { filename } = getUploadPath({ entity, originalname: file.originalname });
        cb(null, filename);
      }
    })
  });
}

const uploadUser = makeMulter("user");
const uploadService = makeMulter("service");

module.exports = { uploadUser, uploadService };
