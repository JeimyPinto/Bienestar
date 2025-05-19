const express = require("express");
const router = express.Router();
const path = require("path");
const { upload } = require("../config/multerConfig.js");
const userController = require("../controllers/user.js");
const authMiddleware = require("../middlewares/auth.js");

router.get("/", userController.getAll);
router.get("/active", userController.getAllActive);
router.get("/paginated", userController.getAllPaginated);
router.get("/:id", userController.getById);
router.put(
  "/:id",userController.update);

// Ruta para eliminar un usuario por ID
router.delete("/:id", authMiddleware.authenticateToken, userController.delete);
module.exports = router;
