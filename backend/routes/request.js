// =======================
// Librerías de terceros
// =======================
const express = require("express");

// =======================
// Middlewares / Utilidades
// =======================
const { authenticateToken, authorizeRoles } = require("../middlewares");
const ROLES = require("../constants/roles");
const validate = require("../middlewares/validateSchema.js");

// =======================
// Controladores
// =======================
const requestController = require("../controllers/request.js");

// =======================
// Esquemas
// =======================
const { requestSchema } = require("../schemas/request.js");

// =======================
// Inicialización de Router
// =======================
const router = express.Router();

// =======================
// Rutas de solicitudes
// =======================
// Obtener todas las solicitudes
router.get(
    "/",
    authenticateToken,
    authorizeRoles(ROLES.ADMIN, ROLES.SUPERADMIN),
    requestController.getAll
);

// Obtener todas las solicitudes activas
router.get(
    "/active",
    authenticateToken,
    authorizeRoles(ROLES.ADMIN, ROLES.SUPERADMIN),
    requestController.getAllActive
);

// Obtener una solicitud por ID
router.get(
    "/:id",
    authenticateToken,
    authorizeRoles(ROLES.ADMIN, ROLES.SUPERADMIN),
    requestController.getById
);

// Crear una nueva solicitud
router.post(
    "/",
    authenticateToken,
    authorizeRoles(ROLES.ADMIN, ROLES.SUPERADMIN),
    validate(requestSchema),
    requestController.create
);

// Actualizar una solicitud existente
router.put(
    "/:id",
    authenticateToken,
    authorizeRoles(ROLES.ADMIN, ROLES.SUPERADMIN),
    validate(requestSchema),
    requestController.update
);

// Obtener todas las solicitudes de un usuario específico
router.get(
    "/user/:id",
    authenticateToken,
    requestController.getByUserId
);

// =======================
// Exportación del router
// =======================
module.exports = router;
