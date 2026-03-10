const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.js");
const sanitizeRequestBody = require("../middlewares/sanitizeInput.js");
const validateRequestSchema = require("../middlewares/validateSchema.js");
const { loginSchema } = require("../schemas/user.js");

const authenticateToken = require("../middlewares/authenticateToken.js");

router.post("/login", sanitizeRequestBody, validateRequestSchema(loginSchema), authController.login);

// Validar reCAPTCHA antes de login
router.post("/verify-recaptcha", authController.verifyRecaptcha);

// Cambiar contraseña (Requiere estar logueado)
router.post("/change-password", authenticateToken, authController.changePassword);

module.exports = router;
