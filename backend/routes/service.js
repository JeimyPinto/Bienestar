// =======================
// Librerías de terceros
// =======================
const express = require("express");

// =======================
// Configuración / Utilidades
// =======================
const { uploadService } = require("../middlewares");

// =======================
// Middlewares
// =======================
const { authenticateToken, authorizeRoles } = require("../middlewares/auth");
const validate = require("../middlewares/validateSchema.js");

// =======================
// Controladores
// =======================
const serviceController = require("../controllers/service.js");
const ROLES = require("../constants/roles.js");
const { serviceSchema } = require("../schemas/service.js");

// =======================
// Inicialización de Router
// =======================
const router = express.Router();

// =======================
// Rutas de servicios
// =======================
// Obtener todos los servicios
router.get("/", authenticateToken, authorizeRoles(ROLES.ADMIN, ROLES.SUPERADMIN), serviceController.getAll);

// Obtener todos los servicios activos (público)
router.get("/active", serviceController.getAllActive);
//Obtener todos los servicios creados por un usuario
router.get("/user/:id", authenticateToken, authorizeRoles(ROLES.ADMIN, ROLES.SUPERADMIN), serviceController.getByUserId);
// Obtener un servicio por ID (requiere rol)
router.get("/:id", authorizeRoles(ROLES.ADMIN, ROLES.SUPERADMIN, ROLES.INSTRUCTOR), serviceController.getById);

// Crear un nuevo servicio (requiere autenticación y rol, permite subir imagen)
router.post(
  "/",
  authenticateToken,
  authorizeRoles(ROLES.ADMIN, ROLES.SUPERADMIN),
  uploadService.single("file"),
  validate(serviceSchema),
  serviceController.create
);

// Actualizar un servicio existente (requiere autenticación y rol, permite subir imagen)
router.put(
  "/:id",
  authenticateToken,
  authorizeRoles(ROLES.ADMIN, ROLES.SUPERADMIN),
  uploadService.single("file"),
  validate(serviceSchema),
  serviceController.update
);

// =======================
// Exportación del router
// =======================
module.exports = router;
