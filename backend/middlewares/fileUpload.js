const multer = require("multer");
const { getUploadPath } = require("../utils/fileStorage.js");

/**
 * Crea un middleware de subida de archivos para una entidad específica.
 * @param {string} entity - Nombre de la entidad ("user", "service", etc.)
 * @returns {multer.Instance} Middleware de multer configurado
 */
function createEntityUploader(entity) {
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

const uploadUser = createEntityUploader("user");
const uploadService = createEntityUploader("service");

module.exports = { uploadUser, uploadService, createEntityUploader };
