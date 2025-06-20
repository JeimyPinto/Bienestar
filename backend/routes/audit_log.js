const express = require("express");
const router = express.Router();
const auditLogController = require("../controllers/audit_log.js");

router.get("/", auditLogController.getAll);

router.get("/:id", auditLogController.getById);

module.exports = router;
