const express = require("express");
const router = express.Router();
const { upload } = require("../config/multerConfig.js");
const serviceController = require("../controllers/service.js");
const authMiddleware = require("../middlewares/auth.js");

router.get("/", serviceController.getAllServices);
router.get(
  "/:id",
  authMiddleware.authenticateToken,
  authMiddleware.authorizeRole(),
  serviceController.getServiceById
);
router.post(
  "/",
  authMiddleware.authenticateToken,
  authMiddleware.authorizeRole(),
  serviceController.createService
);
router.put(
  "/:id",
  authMiddleware.authenticateToken,
  authMiddleware.authorizeRole(),
  serviceController.updateService
);
router.delete(
  "/:id",
  authMiddleware.authenticateToken,
  authMiddleware.authorizeRole(),
  serviceController.deleteService
);

module.exports = router;
