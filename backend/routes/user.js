const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.js");
const authMiddleware = require("../middlewares/auth.js");

router.get(
  "/",
  authMiddleware.authenticateToken,
  authMiddleware.authorizeRole(),
  userController.getAll
);
router.get(
  "/id/:id",
  authMiddleware.authenticateToken,
  authMiddleware.authorizeRole(),
  userController.getById
);
router.get(
  "/document/:documentNumber",
  authMiddleware.authenticateToken,
  authMiddleware.authorizeRole(),
  userController.getByDocument
);
router.put(
  "/update-self",
  authMiddleware.authenticateToken,
  userController.updateSelf
);
router.put(
  "/update/:id",
  authMiddleware.authenticateToken,
  userController.update
);
router.delete(
  "/delete/:id",
  authMiddleware.authenticateToken,
  userController.delete
);

module.exports = router;
