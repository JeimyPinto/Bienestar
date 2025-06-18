// ===================== LIBRERÍAS =====================
const express = require("express");
const router = express.Router();

// ===================== CONTROLADORES =====================
const userController = require("../controllers/user.js");

// ===================== MIDDLEWARES =====================
const { uploadUser } = require("../middlewares/fileUpload.js");
const { authorizeRoles } = require("../middlewares");
const validateRequestSchema = require("../middlewares/validateSchema.js");
const sanitizeRequestBody = require("../middlewares/sanitizeInput.js");
const removeSensitiveFields = require("../middlewares/removeSensitiveFields.js");
const sendWelcomeMail = require("../middlewares/sendWelcomeMail.js");
const sendUpdateMail = require("../middlewares/sendUpdateMail.js");

// ===================== CONSTANTES =====================
const ROLES = require("../constants/roles");

// ===================== ESQUEMAS =====================
const { createSchema, updateSchema } = require("../schemas/user.js");

// ===================== RUTAS =====================

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     description: Retorna todos los usuarios registrados. Solo accesible para usuarios con rol ADMIN, SUPERADMIN o INSTRUCTOR.
 *     responses:
 *       200:
 *         description: Lista de todos los usuarios obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuarios obtenidos correctamente
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       404:
 *         description: No hay usuarios registrados
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Prohibido (rol insuficiente)
 */
// Obtener todos los usuarios
router.get(
    "/",
    authorizeRoles(ROLES.ADMIN, ROLES.SUPERADMIN, ROLES.INSTRUCTOR),
    userController.getAll,
    removeSensitiveFields
);

// Obtener todos los usuarios activos
router.get(
    "/active",
    authorizeRoles(ROLES.ADMIN, ROLES.SUPERADMIN, ROLES.INSTRUCTOR),
    userController.getAllActive,
    removeSensitiveFields
);

// Obtener usuarios paginados
router.get(
    "/paginated",
    authorizeRoles(ROLES.ADMIN, ROLES.SUPERADMIN, ROLES.INSTRUCTOR),
    userController.getAllPaginated,
    removeSensitiveFields
);

// Obtener usuario por ID
router.get(
    "/:id",
    authorizeRoles(ROLES.ADMIN, ROLES.SUPERADMIN, ROLES.INSTRUCTOR),
    userController.getById,
    removeSensitiveFields
);

// Crear usuario
router.post(
    "/",
    uploadUser.single("file"),
    sanitizeRequestBody,
    authorizeRoles(ROLES.ADMIN, ROLES.SUPERADMIN),
    validateRequestSchema(createSchema),
    userController.create,
    sendWelcomeMail,
    removeSensitiveFields
);

// Actualizar usuario
router.put(
    "/:id",
    authorizeRoles(ROLES.ADMIN, ROLES.SUPERADMIN),
    uploadUser.single("file"),
    sanitizeRequestBody,
    validateRequestSchema(updateSchema),
    userController.update,
    sendUpdateMail,
    removeSensitiveFields
);

module.exports = router;