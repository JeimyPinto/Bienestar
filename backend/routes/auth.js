const express = require("express");
const authController = require("../controllers/auth.js");
const { authenticateToken,authorizeRole } = require("../middlewares/auth.js");
const router = express.Router();

router.post('/login', authController.login);
router.post('/register', authController.register,authorizeRole());
router.post('/logout', authController.logout,authenticateToken);

module.exports = router;