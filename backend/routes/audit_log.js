/**
 * @openapi
 * components:
 *   schemas:
 *     AuditLogRequest:
 *       type: object
 *       required:
 *         - action
 *         - entityType
 *         - entityId
 *         - userId
 *       properties:
 *         action:
 *           type: string
 *           description: Acción realizada (ej: CREATE, UPDATE, DELETE)
 *           example: "CREATE"
 *         entityType:
 *           type: string
 *           description: Tipo de entidad afectada (ej: User, Service, Group, Request)
 *           example: "User"
 *         entityId:
 *           type: integer
 *           description: ID de la entidad afectada
 *           example: 12
 *         userId:
 *           type: integer
 *           description: ID del usuario que realizó la acción
 *           example: 5
 *         details:
 *           type: object
 *           description: Detalles adicionales de la acción (opcional)
 *           example: { "field": "valueBefore", "field2": "valueAfter" }
 */

const express = require("express");
const router = express.Router();
const auditLogController = require("../controllers/audit_log.js");

/**
 * @openapi
 * /audit-logs:
 *   get:
 *     summary: Obtiene todos los registros de auditoría
 *     tags: [AuditLog]
 *     security:
 *       - bearerAuth: []
 *     description: Retorna todos los registros de auditoría del sistema.
 *     responses:
 *       200:
 *         description: Lista de registros de auditoría obtenida correctamente
 */
router.get("/", auditLogController.getAll);

/**
 * @openapi
 * /audit-logs/{id}:
 *   get:
 *     summary: Obtiene un registro de auditoría por ID
 *     tags: [AuditLog]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del registro de auditoría
 *     responses:
 *       200:
 *         description: Registro de auditoría encontrado correctamente
 *       404:
 *         description: Registro de auditoría no encontrado
 */
router.get("/:id", auditLogController.getById);

module.exports = router;
