const express = require("express");
const router = express.Router();
const { upload } = require("../app.js"); // Importar el middleware de multer desde app.js
const userController = require("../controllers/user.js");
const authMiddleware = require("../middlewares/auth.js");

console.log('Upload middleware:', upload); // Verificar el valor de upload

router.get(
  "/",
  authMiddleware.authenticateToken,
  authMiddleware.authorizeRole(),
  userController.getAll
);
router.get(
  "/id/:id",
  authMiddleware.authenticateToken,
  authMiddleware.authorizeRole(),
  userController.getById
);
router.get(
  "/document/:documentNumber",
  authMiddleware.authenticateToken,
  authMiddleware.authorizeRole(),
  userController.getByDocument
);
router.put(
  "/update-self",
  authMiddleware.authenticateToken,
  userController.updateSelf
);
router.put(
  "/update/:id",
  authMiddleware.authenticateToken,
  userController.update
);
router.delete(
  "/delete/:id",
  authMiddleware.authenticateToken,
  userController.delete
);

// Ruta para subir la imagen de perfil
router.post('/uploadProfileImage', authMiddleware.authenticateToken, upload.single('image'), (req, res) => {
  try {
    const fileName = req.file.filename;
    res.json({ fileName });
  } catch (error) {
    res.status(500).json({ error: 'Error al subir la imagen' });
  }
});

module.exports = router;