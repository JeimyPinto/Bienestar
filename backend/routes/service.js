// =======================
// Librerías de terceros
// =======================
const express = require("express");

// =======================
// Middlewares
// =======================
const { authenticateToken, authorizeRoles } = require("../middlewares/auth");
const validateRequestSchema = require("../middlewares/validateSchema.js");
const { uploadService } = require("../middlewares/fileUpload.js");

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

router.get("/", authenticateToken, authorizeRoles(ROLES.ADMIN, ROLES.SUPERADMIN), serviceController.getAll);

router.get("/active", serviceController.getAllActive);

router.get("/user/:id", authenticateToken, authorizeRoles(ROLES.ADMIN, ROLES.SUPERADMIN,ROLES.INSTRUCTOR), serviceController.getByUserId);

router.get(":id", authorizeRoles(ROLES.ADMIN, ROLES.SUPERADMIN, ROLES.INSTRUCTOR), serviceController.getById);

router.post(
  "/",
  authenticateToken,
  authorizeRoles(ROLES.ADMIN, ROLES.SUPERADMIN),
  uploadService.single("file"),
  validateRequestSchema(serviceSchema),
  serviceController.create
);

router.put(
  "/:id",
  authenticateToken,
  authorizeRoles(ROLES.ADMIN, ROLES.SUPERADMIN),
  uploadService.single("file"),
  validateRequestSchema(serviceSchema),
  serviceController.update
);

// =======================
// Exportación del router
// =======================
module.exports = router;
