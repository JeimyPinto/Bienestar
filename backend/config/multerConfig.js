const multer = require("multer");
const path = require("path");
const fs = require("fs");

/**
 * Configuración de almacenamiento para multer.
 * 
 * Esta configuración define cómo y dónde se almacenarán los archivos subidos.
 * 
 * @type {multer.StorageEngine}
 */
const storage = multer.diskStorage({
  /**
   * Define el destino donde se guardarán los archivos subidos.
   * 
   * @param {Object} req - La solicitud HTTP.
   * @param {Object} file - El archivo que se está subiendo.
   * @param {Function} cb - Callback para indicar el destino.
   */
  destination: function (req, file, cb) {
    // Define la ruta base para el almacenamiento de archivos
    let uploadPath = path.join(__dirname, "..", "uploads", "images");

    // Verifica si la solicitud es para subir una imagen de perfil
    if (req.path.includes("uploadProfileImage")) {
      const userId = req.body.userId;
      if (!userId) {
        return cb(new Error("userId is required"));
      }
      // Define la ruta específica para las imágenes de perfil
      uploadPath = path.join(uploadPath, "profile", userId);
    } 
    // Para subir una imagen de un  servicio
    else if (req.path.includes("uploadServiceImage")) {
      const serviceId = req.body.serviceId;
      if (!serviceId) {
        return cb(new Error("serviceId is required"));
      }
      // Define la ruta específica para las imágenes de servicios
      uploadPath = path.join(uploadPath, "services", serviceId);
    } 
    // Si la ruta no es válida, devuelve un error
    else {
      return cb(new Error("Invalid upload path"));
    }

    // Crea el directorio si no existe
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },

  /**
   * Define el nombre del archivo que se guardará.
   * 
   * @param {Object} req - La solicitud HTTP.
   * @param {Object} file - El archivo que se está subiendo.
   * @param {Function} cb - Callback para indicar el nombre del archivo.
   */
  filename: function (req, file, cb) {
    // Utiliza el nombre original del archivo para guardarlo
    cb(null, file.originalname);
  },
});

// Inicializa multer con la configuración de almacenamiento
const upload = multer({ storage: storage });

module.exports = { upload };