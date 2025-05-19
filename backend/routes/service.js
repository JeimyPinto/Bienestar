const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/service.js");
const authMiddleware = require("../middlewares/auth.js");

router.get("/", authMiddleware.authenticateToken, authMiddleware.authorizeRole(), serviceController.getAll);
router.get("/active", serviceController.getAllActive);
router.get("/:id", authMiddleware.authenticateToken, authMiddleware.authorizeRole(), serviceController.getById);
router.post("/", authMiddleware.authenticateToken, authMiddleware.authorizeRole(), serviceController.create);
// router.put(
//   "/:id",
//   authMiddleware.authenticateToken,
//   authMiddleware.authorizeRole(),
//   serviceController.updateService
// );
// router.delete(
//   "/:id",
//   authMiddleware.authenticateToken,
//   authMiddleware.authorizeRole(),
//   serviceController.deleteService
// );

module.exports = router;
