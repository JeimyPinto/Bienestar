// =======================
// Librerías de terceros
// =======================
const express = require("express");

// =======================
// Middlewares / Utilidades
// =======================
const { authenticateToken, authorizeRoles } = require("../middlewares");
const ROLES = require("../constants/roles");
const validateRequestSchema = require("../middlewares/validateSchema.js");
const sanitizeRequestBody = require("../middlewares/sanitizeInput.js");

// =======================
// Controladores
// =======================
const requestController = require("../controllers/request.js");
// =======================
// Esquemas de validación
// =======================
const { requestSchema } = require("../schemas/request.js");
// =======================
// Inicialización de Router
// =======================
const router = express.Router();

router.get(
    "/",
    authorizeRoles(ROLES.ADMIN, ROLES.SUPERADMIN),
    requestController.getAll
);

router.get(
    "/active",
    authorizeRoles(ROLES.ADMIN, ROLES.SUPERADMIN),
    requestController.getAllActive
);

router.get(
    "/:id",
    authorizeRoles(ROLES.ADMIN, ROLES.SUPERADMIN),
    requestController.getById
);

router.post(
    "/",
    sanitizeRequestBody,
    validateRequestSchema(requestSchema),
    requestController.create
);

router.put(
    "/:id",
    authorizeRoles(ROLES.ADMIN, ROLES.SUPERADMIN),
    sanitizeRequestBody,
    validateRequestSchema(requestSchema),
    requestController.update
);

router.get(
    "/user/:id",
    authenticateToken,
    requestController.getByUserId
);

// =======================
// Exportación del router
// =======================
module.exports = router;
