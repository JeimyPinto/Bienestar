const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.js");
const authMiddleware = require("../middlewares/auth.js");

const { upload } = require("../config/multer.js");

router.post(
  "/register",
  authMiddleware.authenticateToken,
  authMiddleware.authorizeRole(),
  upload.single("file"),
  authController.register
);
router.post("/login", authController.login);
router.post("/logout", authMiddleware.authenticateToken, authController.logout);

module.exports = router;
