const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.js");
const sanitizeRequestBody = require("../middlewares/sanitizeInput.js");
const validateRequestSchema = require("../middlewares/validateSchema.js");
const { loginSchema } = require("../schemas/user.js");

router.post("/login", sanitizeRequestBody, validateRequestSchema(loginSchema), authController.login);

// Validar reCAPTCHA antes de login
router.post("/verify-recaptcha", authController.verifyRecaptcha);

module.exports = router;
