const express = require("express");
const router = express.Router();
const groupController = require("../controllers/group.js");
const { authenticateToken, authorizeRoles } = require("../middlewares/auth");
const validate = require("../middlewares/validation.js");
const { createGroupSchema, updateGroupSchema } = require("../schemas/group.js");
const ROLES = require("../constants/roles");

// Obtener todos los grupos
router.get(
  "/",
  authenticateToken,
  authorizeRoles(ROLES.ADMIN, ROLES.SUPERADMIN, ROLES.INSTRUCTOR),
  groupController.getAll
);

// Obtener grupo por ID
router.get(
  "/:id",
  authenticateToken,
  authorizeRoles(ROLES.ADMIN, ROLES.SUPERADMIN, ROLES.INSTRUCTOR),
  groupController.getById
);

// Crear grupo
router.post(
  "/",
  authenticateToken,
  authorizeRoles(ROLES.ADMIN, ROLES.SUPERADMIN),
  validate(createGroupSchema),
  groupController.create
);

// Actualizar grupo
router.put(
  "/:id",
  authenticateToken,
  authorizeRoles(ROLES.ADMIN, ROLES.SUPERADMIN),
  validate(updateGroupSchema),
  groupController.update
);

module.exports = router;
