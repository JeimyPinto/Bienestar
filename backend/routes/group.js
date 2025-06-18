const express = require("express");
const router = express.Router();
const groupController = require("../controllers/group.js");
const { authenticateToken, authorizeRoles } = require("../middlewares");
const validateRequestSchema = require("../middlewares/validateSchema.js");
const { createGroupSchema, updateGroupSchema } = require("../schemas/group.js");
const ROLES = require("../constants/roles");

/**
 * @openapi
 * /groups:
 *   get:
 *     summary: Obtiene todos los grupos
 *     tags: [Group]
 *     security:
 *       - bearerAuth: []
 *     description: Solo accesible para usuarios con rol ADMIN, SUPERADMIN o INSTRUCTOR.
 *     responses:
 *       200:
 *         description: Grupos obtenidos correctamente
 */
router.get(
  "/",
  authenticateToken,
  authorizeRoles(ROLES.ADMIN, ROLES.SUPERADMIN, ROLES.INSTRUCTOR),
  groupController.getAll
);

/**
 * @openapi
 * /groups/{id}:
 *   get:
 *     summary: Obtiene un grupo por ID
 *     tags: [Group]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del grupo a consultar
 *     responses:
 *       200:
 *         description: Grupo obtenido correctamente
 *       404:
 *         description: Grupo no encontrado
 */
router.get(
  "/:id",
  authenticateToken,
  authorizeRoles(ROLES.ADMIN, ROLES.SUPERADMIN, ROLES.INSTRUCTOR),
  groupController.getById
);

/**
 * @openapi
 * /groups:
 *   post:
 *     summary: Crea un nuevo grupo
 *     tags: [Group]
 *     security:
 *       - bearerAuth: []
 *     description: Solo accesible para usuarios con rol ADMIN o SUPERADMIN. Crea un grupo con los datos enviados en el body.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Group'
 *     responses:
 *       201:
 *         description: Grupo creado correctamente
 *       400:
 *         description: Error de validación en los datos enviados
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Prohibido (rol insuficiente)
 */
router.post(
  "/",
  authenticateToken,
  authorizeRoles(ROLES.ADMIN, ROLES.SUPERADMIN),
  validateRequestSchema(createGroupSchema),
  groupController.create
);

/**
 * @openapi
 * /groups/{id}:
 *   put:
 *     summary: Actualiza un grupo existente
 *     tags: [Group]
 *     security:
 *       - bearerAuth: []
 *     description: Solo accesible para usuarios con rol ADMIN o SUPERADMIN. Actualiza los datos de un grupo existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del grupo a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Group'
 *     responses:
 *       200:
 *         description: Grupo actualizado correctamente
 *       400:
 *         description: Error de validación en los datos enviados
 *       404:
 *         description: Grupo no encontrado
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Prohibido (rol insuficiente)
 */
router.put(
  "/:id",
  authenticateToken,
  authorizeRoles(ROLES.ADMIN, ROLES.SUPERADMIN),
  validateRequestSchema(updateGroupSchema),
  groupController.update
);

module.exports = router;
