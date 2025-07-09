const express = require("express");
const router = express.Router();
const groupController = require("../controllers/group.js");
const  authorizeRoles  = require("../middlewares/authorizeRoles.js");
const validateRequestSchema = require("../middlewares/validateSchema.js");
const { createGroupSchema, updateGroupSchema } = require("../schemas/group.js");
const ROLES = require("../constants/roles");

router.get(
  "/",
  authorizeRoles(ROLES.ADMIN, ROLES.SUPERADMIN, ROLES.INSTRUCTOR),
  groupController.getAll
);

router.get(
  "/:id",
  authorizeRoles(ROLES.ADMIN, ROLES.SUPERADMIN, ROLES.INSTRUCTOR),
  groupController.getById
);

router.post(
  "/",
  authorizeRoles(ROLES.ADMIN, ROLES.SUPERADMIN),
  validateRequestSchema(createGroupSchema),
  groupController.create
);

router.put(
  "/:id",
  authorizeRoles(ROLES.ADMIN, ROLES.SUPERADMIN),
  validateRequestSchema(updateGroupSchema),
  groupController.update
);

module.exports = router;
