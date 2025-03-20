const express = require("express");
const router = express.Router();
const { upload } = require("../config/multerConfig.js"); // Importar el middleware de multer
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

// Ruta para actualizar la información del usuario autenticado
router.put(
  "/update-self",
  authMiddleware.authenticateToken,
  userController.updateSelf
);

// Ruta para actualizar la información de un usuario por ID
router.put(
  "/update/:id",
  authMiddleware.authenticateToken,
  userController.update
);

// Ruta para eliminar un usuario por ID
router.delete(
  "/delete/:id",
  authMiddleware.authenticateToken,
  userController.delete
);

/**
 * Ruta para subir la imagen de perfil
 * @route POST /uploadProfileImage
 * @desc Subir una imagen de perfil para el usuario autenticado
 * @access Private
 * @returns {Object} - Archivo subido
 * @version 20/03/2025
 * @author JeimyPinto
 */
router.post('/uploadProfileImage', authMiddleware.authenticateToken, upload.single('file'), (req, res) => {
  try {
    const userId = req.body.userId;
    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }
    const fileName = req.file.filename;
    res.json({ fileName });
  } catch (error) {
    res.status(500).json({ error: 'Error al subir la imagen' });
  }
});

module.exports = router;