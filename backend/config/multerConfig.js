const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "uploads", "temp")); // Carpeta temporal
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.replace(/\s+/g, "_").toLowerCase();
    cb(null, fileName);
  },
});

// Filtro para validar el tipo de archivo
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type / Tipo de archivo no válido"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Límite de 5 MB
});

module.exports = { upload };