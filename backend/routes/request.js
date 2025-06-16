// =======================
// Librerías de terceros
// =======================
const express = require("express");

// =======================
// Controladores
// =======================
const requestController = require("../controllers/request.js");

// =======================
// Inicialización de Router
// =======================
const router = express.Router();

// =======================
// Rutas de solicitudes
// =======================
// Obtener todas las solicitudes
router.get("/", requestController.getAll);

// Obtener todas las solicitudes activas
router.get("/active", requestController.getAllActive);

// Obtener una solicitud por ID
router.get("/:id", requestController.getById);

// Crear una nueva solicitud
router.post("/", requestController.create);

// Actualizar una solicitud existente
router.put("/:id", requestController.update);

// Obtener todas las solicitudes de un usuario específico
router.get("/user/:id", requestController.getByUserId);

// =======================
// Exportación del router
// =======================
module.exports = router;
