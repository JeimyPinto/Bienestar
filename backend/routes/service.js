const express = require("express");
const router = express.Router();
const { upload } = require("../config/multerConfig.js"); // Importar el middleware de multer directamente desde multerConfig.js

const serviceController = require("../controllers/service.js");
const authMiddleware = require("../middlewares/auth.js");

router.get("/", serviceController.getAllServices);
router.get(
  "/:id",
  authMiddleware.authenticateToken,
  authMiddleware.authorizeRole(),
  serviceController.getServiceById
);
router.post(
  "/",
  authMiddleware.authenticateToken,
  authMiddleware.authorizeRole(),
  serviceController.createService
);
router.put(
  "/:id",
  authMiddleware.authenticateToken,
  authMiddleware.authorizeRole(),
  serviceController.updateService
);
router.delete(
  "/:id",
  authMiddleware.authenticateToken,
  authMiddleware.authorizeRole(),
  serviceController.deleteService
);

router.post(
  "/uploadServiceImage",
  authMiddleware.authenticateToken,
  upload.single("image"),
  (req, res) => {
    try {
      const serviceId = req.body.serviceId; // Asegúrate de que serviceId se envíe en la solicitud
      if (!serviceId) {
        return res.status(400).json({ error: "serviceId is required" });
      }
      const fileName = req.file.filename;
      res.json({ fileName });
    } catch (error) {
      res.status(500).json({ error: "Error al subir la imagen" });
    }
  }
);

module.exports = router;
