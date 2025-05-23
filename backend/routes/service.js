const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/service.js");
const authMiddleware = require("../middlewares/auth.js");

router.get("/", authMiddleware.authenticateToken, authMiddleware.authorizeRole(), serviceController.getAll)
router.get("/active", serviceController.getAllActive);
router.get("/:id", authMiddleware.authorizeRole(), serviceController.getById);
router.post("/", authMiddleware.authorizeRole(), serviceController.create);
router.put("/:id", authMiddleware.authorizeRole(), serviceController.update);
router.delete("/:id", authMiddleware.authorizeRole(), serviceController.delete);

module.exports = router;
