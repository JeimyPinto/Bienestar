const express = require("express");
const router = express.Router();
const auditLogController = require("../controllers/audit_log.js");

// Obtener todas las auditorías, con filtros opcionales
router.get("/", auditLogController.getAll);

// Obtener una auditoría por ID
router.get("/:id", auditLogController.getById);

module.exports = router;
