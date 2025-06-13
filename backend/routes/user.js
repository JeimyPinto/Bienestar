const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.js");
const { uploadUser } = require("../config/multer.js");
const { authorizeRoles } = require("../middlewares/auth.js");
const ROLES = require("../constants/roles");

router.get("/", authorizeRoles(ROLES.ADMIN, ROLES.SUPERADMIN), userController.getAll);
router.get("/active", userController.getAllActive);
router.get("/paginated", userController.getAllPaginated);
router.get("/:id", userController.getById);
router.post("/", authorizeRoles(ROLES.ADMIN, ROLES.SUPERADMIN), uploadUser.single("file"), userController.create);
router.put("/:id", uploadUser.single("file"), userController.update);

module.exports = router;