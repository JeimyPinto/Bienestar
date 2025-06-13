// ===================== LIBRERÍAS =====================
const express = require("express");
const router = express.Router();

// ===================== CONTROLADORES =====================
const userController = require("../controllers/user.js");

// ===================== MIDDLEWARES =====================
const { uploadUser } = require("../config/multer.js");
const { authorizeRoles } = require("../middlewares/auth.js");

// ===================== CONSTANTES =====================
const ROLES = require("../constants/roles");

// ===================== RUTAS =====================

// Obtener todos los usuarios
router.get(
    "/",
    authorizeRoles(ROLES.ADMIN, ROLES.SUPERADMIN, ROLES.INSTRUCTOR),
    userController.getAll
);

// Obtener todos los usuarios activos
router.get(
    "/active",
    authorizeRoles(ROLES.ADMIN, ROLES.SUPERADMIN, ROLES.INSTRUCTOR),
    userController.getAllActive
);

// Obtener usuarios paginados
router.get(
    "/paginated",
    authorizeRoles(ROLES.ADMIN, ROLES.SUPERADMIN, ROLES.INSTRUCTOR),
    userController.getAllPaginated
);

// Obtener usuario por ID
router.get(
    "/:id",
    authorizeRoles(ROLES.ADMIN, ROLES.SUPERADMIN, ROLES.INSTRUCTOR),
    userController.getById
);

// Crear usuario
router.post(
    "/",
    uploadUser.single("file"),
    authorizeRoles(ROLES.ADMIN, ROLES.SUPERADMIN),
    userController.create
);

// Actualizar usuario
router.put(
    "/:id",
    authorizeRoles(ROLES.ADMIN, ROLES.SUPERADMIN),
    uploadUser.single("file"),
    userController.update
);

module.exports = router;