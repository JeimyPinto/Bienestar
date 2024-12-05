const multer = require("multer");
const path = require("path");
const fs = require("fs");

/**
 * Middleware para subir archivos al servidor
 * Recupera el ID del recurso al que se le subirá la imagen
 * Crea un directorio con el ID del recurso en la carpeta public/images
 * Guarda la imagen en el directorio creado
 * @param {object} req - Objeto de la petición
 * @param {object} file - Archivo a subir
 * @param {string} id - ID del recurso al que se le subirá la imagen
 * @version 05/12/2024
 * @autor JeimyPinto
 */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { id } = req.params;
    const dir = path.join(__dirname, `../public/images/${id}`);
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

module.exports = upload;