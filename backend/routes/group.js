const express = require("express");
const router = express.Router();
const groupController = require("../controllers/group.js");
const { authenticateToken, authorizeRoles } = require("../middlewares");
const validateRequestSchema = require("../middlewares/validateSchema.js");
const { createGroupSchema, updateGroupSchema } = require("../schemas/group.js");
const ROLES = require("../constants/roles");

router.get(
  "/",
  authenticateToken,
  authorizeRoles(ROLES.ADMIN, ROLES.SUPERADMIN, ROLES.INSTRUCTOR),
  groupController.getAll
);

router.get(
  "/:id",
  authenticateToken,
  authorizeRoles(ROLES.ADMIN, ROLES.SUPERADMIN, ROLES.INSTRUCTOR),
  groupController.getById
);

router.post(
  "/",
  authenticateToken,
  authorizeRoles(ROLES.ADMIN, ROLES.SUPERADMIN),
  validateRequestSchema(createGroupSchema),
  groupController.create
);

router.put(
  "/:id",
  authenticateToken,
  authorizeRoles(ROLES.ADMIN, ROLES.SUPERADMIN),
  validateRequestSchema(updateGroupSchema),
  groupController.update
);

module.exports = router;
