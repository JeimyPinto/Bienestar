const express = require("express");
const router = express.Router();
const multer = require("multer");
const BulkUserController = require("../controllers/bulkUser");
const authenticateToken = require("../middlewares/authenticateToken");
const authorizeRoles = require("../middlewares/authorizeRoles");
const ROLES = require("../constants/roles");

// Configurar multer para archivos en memoria
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB máximo
  },
  fileFilter: (req, file, cb) => {
    // Aceptar solo archivos Excel
    const allowedMimes = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ];
    
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Solo se permiten archivos Excel (.xls, .xlsx)"), false);
    }
  }
});

/**
 * @route POST /api/bulk-users/upload
 * @desc Carga masiva de usuarios desde Excel
 * @access Admin, SuperAdmin
 */
router.post(
  "/upload",
  authenticateToken,
  authorizeRoles(ROLES.ADMIN, ROLES.SUPERADMIN),
  upload.single("excel"),
  BulkUserController.bulkCreate
);

/**
 * @route GET /api/bulk-users/template
 * @desc Descargar plantilla Excel para carga masiva
 * @access Admin, SuperAdmin
 */
router.get(
  "/template",
  authenticateToken,
  authorizeRoles(ROLES.ADMIN, ROLES.SUPERADMIN),
  BulkUserController.downloadTemplate
);

module.exports = router;
