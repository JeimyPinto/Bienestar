// ===================== LIBRERÍAS =====================
const express = require("express");
const router = express.Router();

// ===================== CONTROLADORES =====================
const userController = require("../controllers/user.js");

// ===================== MIDDLEWARES =====================
const { uploadUser } = require("../middlewares/fileUpload.js");
const  authorizeRoles  = require("../middlewares/authorizeRoles.js");
const validateRequestSchema = require("../middlewares/validateSchema.js");
const sanitizeRequestBody = require("../middlewares/sanitizeInput.js");
const removeSensitiveFields = require("../middlewares/removeSensitiveFields.js");

// ===================== CONSTANTES =====================
const ROLES = require("../constants/roles");

// ===================== ESQUEMAS =====================
const { createSchema, updateSchema } = require("../schemas/user.js");

// ===================== RUTAS =====================

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

// Obtener usuarios por rol
router.get(
    "/role/:role",
    authorizeRoles(ROLES.ADMIN, ROLES.SUPERADMIN, ROLES.INSTRUCTOR),
    userController.getAllByRole,
    removeSensitiveFields
);

// Obtener información del usuario autenticado (perfil propio)
router.get(
    "/me",
    userController.getMyProfile,
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
    removeSensitiveFields
);



module.exports = router;
