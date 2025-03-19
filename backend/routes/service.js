const express = require("express");
const router = express.Router();
const { upload } = require("../app.js"); // Importar el middleware de multer desde app.js

const serviceController = require("../controllers/service.js");
const authMiddleware = require("../middlewares/auth.js");

router.get("/", serviceController.getAllServices);
router.get("/:id", authMiddleware.authenticateToken, authMiddleware.authorizeRole(), serviceController.getServiceById);
router.post("/", authMiddleware.authenticateToken, authMiddleware.authorizeRole(), serviceController.createService);
router.put("/:id", authMiddleware.authenticateToken, authMiddleware.authorizeRole(), serviceController.updateService);
router.delete("/:id", authMiddleware.authenticateToken, authMiddleware.authorizeRole(), serviceController.deleteService);

// Ruta para subir la imagen de servicio
router.post('/uploadServiceImage', authMiddleware.authenticateToken, upload.single('image'), (req, res) => {
  try {
    const fileName = req.file.filename;
    res.json({ fileName });
  } catch (error) {
    res.status(500).json({ error: 'Error al subir la imagen' });
  }
});

module.exports = router;