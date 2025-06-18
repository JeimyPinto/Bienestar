// routes/user_audit.js
const express = require("express");
const router = express.Router();
const userAuditController = require("../controllers/user_audit.js");

// Crear registro de auditoría
router.post("/", userAuditController.create);

module.exports = router;
