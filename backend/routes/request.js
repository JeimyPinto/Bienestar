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
/**
 * @openapi
 * /requests:
 *   get:
 *     summary: Obtiene todas las solicitudes, incluyendo el usuario solicitante y el servicio asociado
 *     tags: [Request]
 *     security:
 *       - bearerAuth: []
 *     description: Solo accesible para usuarios con rol ADMIN o SUPERADMIN.
 *     responses:
 *       200:
 *         description: Solicitudes recuperadas con éxito
 *       404:
 *         description: No se encontraron solicitudes
 */
router.get(
    "/",
    authenticateToken,
    authorizeRoles(ROLES.ADMIN, ROLES.SUPERADMIN),
    requestController.getAll
);

// Obtener todas las solicitudes activas
/**
 * @openapi
 * /requests/active:
 *   get:
 *     summary: Obtiene todas las solicitudes activas
 *     tags: [Request]
 *     security:
 *       - bearerAuth: []
 *     description: Solo accesible para usuarios con rol ADMIN o SUPERADMIN.
 *     responses:
 *       200:
 *         description: Solicitudes activas recuperadas con éxito
 *       404:
 *         description: No se encontraron solicitudes activas
 */
router.get(
    "/active",
    authenticateToken,
    authorizeRoles(ROLES.ADMIN, ROLES.SUPERADMIN),
    requestController.getAllActive
);

// Obtener una solicitud por ID
/**
 * @openapi
 * /requests/{id}:
 *   get:
 *     summary: Obtiene una solicitud por ID
 *     tags: [Request]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la solicitud a consultar
 *     responses:
 *       200:
 *         description: Solicitud recuperada con éxito
 *       404:
 *         description: Solicitud no encontrada
 */
router.get(
    "/:id",
    authenticateToken,
    authorizeRoles(ROLES.ADMIN, ROLES.SUPERADMIN),
    requestController.getById
);

// Crear una nueva solicitud
/**
 * @openapi
 * /requests:
 *   post:
 *     summary: Crea una nueva solicitud
 *     tags: [Request]
 *     security:
 *       - bearerAuth: []
 *     description: Solo accesible para usuarios con rol ADMIN o SUPERADMIN. Crea una solicitud con los datos enviados en el body.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Request'
 *     responses:
 *       201:
 *         description: Solicitud creada con éxito
 *       400:
 *         description: Error de validación en los datos enviados
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Prohibido (rol insuficiente)
 */
router.post(
    "/",
    authenticateToken,
    authorizeRoles(ROLES.ADMIN, ROLES.SUPERADMIN),
    validateRequestSchema(requestSchema),
    requestController.create
);

// Actualizar una solicitud existente
/**
 * @openapi
 * /requests/{id}:
 *   put:
 *     summary: Actualiza una solicitud existente
 *     tags: [Request]
 *     security:
 *       - bearerAuth: []
 *     description: Solo accesible para usuarios con rol ADMIN o SUPERADMIN. Actualiza los datos de una solicitud existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la solicitud a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Request'
 *     responses:
 *       200:
 *         description: Solicitud actualizada con éxito
 *       400:
 *         description: Error de validación en los datos enviados
 *       404:
 *         description: Solicitud no encontrada
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Prohibido (rol insuficiente)
 */
router.put(
    "/:id",
    authenticateToken,
    authorizeRoles(ROLES.ADMIN, ROLES.SUPERADMIN),
    validateRequestSchema(requestSchema),
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
