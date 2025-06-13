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
    authorizeRoles(ROLES.INSTRUCTOR),
    userController.getAll
);

// Obtener todos los usuarios activos
router.get(
    "/active",
    authorizeRoles(ROLES.INSTRUCTOR),
    userController.getAllActive
);

// Obtener usuarios paginados
router.get(
    "/paginated",
    authorizeRoles(ROLES.INSTRUCTOR),
    userController.getAllPaginated
);

// Obtener usuario por ID
router.get(
    "/:id",
    authorizeRoles(ROLES.INSTRUCTOR),
    userController.getById
);

// Crear usuario
router.post(
    "/",
    uploadUser.single("file"),
    userController.create
);

// Actualizar usuario
router.put(
    "/:id",
    uploadUser.single("file"),
    userController.update
);

module.exports = router;