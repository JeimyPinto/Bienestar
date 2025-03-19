const express = require("express");
const router = express.Router();
const { upload } = require("../config/multerConfig.js"); // Importar el middleware de multer directamente desde multerConfig.js
const userController = require("../controllers/user.js");
const authMiddleware = require("../middlewares/auth.js");

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
    const userId = req.body.userId; // Asegúrate de que userId se envíe en la solicitud
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