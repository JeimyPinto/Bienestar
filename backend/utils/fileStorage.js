const path = require("path");
const fs = require("fs");

/**
 * Genera la ruta y el nombre de archivo para uploads de imágenes.
 * @param {Object} options
 * @param {"user"|"service"|string} options.entity - Tipo de entidad
 * @param {string} [options.originalname] - Nombre original del archivo
 * @returns {Object} { dir, filename, fullPath }
 */
function getUploadPath({ entity, originalname }) {
  let baseDir = path.join(__dirname, "../uploads/images");
  let subDir = entity === "user" ? "users" : entity === "service" ? "services" : entity;
  let dir = path.join(baseDir, subDir);
  fs.mkdirSync(dir, { recursive: true });
  const ext = originalname ? path.extname(originalname) : "";
  const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
  const filename = `file-${uniqueSuffix}${ext}`;
  const fullPath = path.join(dir, filename);
  return { dir, filename, fullPath };
}

module.exports = { getUploadPath };
