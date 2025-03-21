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
router.post(
  "/upload/images/profile",
  authMiddleware.authenticateToken,
  upload.single("image"),
  (req, res) => {
    console.log(req.file);
    res.send("termina");
  }
);

/**
 * Ruta para mostrar la imagen de perfil
 * @route GET /images/profile/:userId/:fileName
 * @desc Mostrar la imagen de perfil del usuario autenticado
 * @access Private
 * @returns {Object} - Archivo de imagen
 * @version 21/03/2025
 * @since 20/03/2025
 */
router.get("/images/profile/:userId/:fileName", authMiddleware.authenticateToken, (req, res) => {
  const { userId, fileName } = req.params;
  const filePath = path.join(__dirname, '..', 'uploads', 'images', 'profile', userId, fileName);
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error("Error al enviar el archivo:", err);
      res.status(404).send("Imagen no encontrada");
    }
  });
});
module.exports = router;
