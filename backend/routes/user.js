// ===================== LIBRERÍAS =====================
const express = require("express");
const router = express.Router();

// ===================== CONTROLADORES =====================
const userController = require("../controllers/user.js");

// ===================== MIDDLEWARES =====================
const { uploadUser } = require("../config/multer.js");
const { authorizeRoles } = require("../middlewares/auth.js");
const validate = require("../middlewares/validation.js");
const { auditUser } = require("../middlewares/audit.js");
const sanitize = require("../middlewares/sanitize.js");
const removeSensitiveFields = require("../middlewares/removeSensitiveFields.js");
const sendWelcomeMail = require("../middlewares/sendWelcomeMail.js");
const sendUpdateMail = require("../middlewares/sendUpdateMail.js");

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
    sanitize,
    authorizeRoles(ROLES.ADMIN, ROLES.SUPERADMIN),
    validate(createSchema),
    userController.create,
    auditUser("INSERT"),
    sendWelcomeMail,
    removeSensitiveFields
);

// Actualizar usuario
router.put(
    "/:id",
    authorizeRoles(ROLES.ADMIN, ROLES.SUPERADMIN),
    uploadUser.single("file"),
    sanitize,
    validate(updateSchema),
    userController.update,
    auditUser("UPDATE"),
    sendUpdateMail,
    removeSensitiveFields
);

module.exports = router;