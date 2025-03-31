const express = require("express");
const router = express.Router();
const path = require("path");
const { upload } = require("../config/multerConfig.js");
const userController = require("../controllers/user.js");
const authMiddleware = require("../middlewares/auth.js");

// Ruta para obtener todos los usuarios
router.get(
  "/",
  authMiddleware.authenticateToken,
  authMiddleware.authorizeRole(),
  userController.getAll
);

// Ruta para obtener un usuario por ID
router.get(
  "/id/:id",
  authMiddleware.authenticateToken,
  authMiddleware.authorizeRole(),
  userController.getById
);

// Ruta para obtener un usuario por número de documento
router.get(
  "/document/:documentNumber",
  authMiddleware.authenticateToken,
  authMiddleware.authorizeRole(),
  userController.getByDocument
);

// Ruta para actualizar la información de un usuario por ID (solo para administradores)
router.put(
  "/id/:id",
  authMiddleware.authenticateToken,
  upload.single("image"),
  async (req, res, next) => {
    try {
      if (req.file) {
        console.log(`Imagen subida: ${req.file.filename}`);
      }
      // Llama al controlador para manejar la lógica de actualización
      await userController.update(req, res);
    } catch (error) {
      next(error); // Maneja errores si ocurren
    }
  }
);

// Ruta para eliminar un usuario por ID
router.delete(
  "/id/:id",
  authMiddleware.authenticateToken,
  userController.delete
);
module.exports = router;
