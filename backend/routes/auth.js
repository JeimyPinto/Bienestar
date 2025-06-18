const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.js");
const sanitizeRequestBody = require("../middlewares/sanitizeInput.js");
const validateRequestSchema = require("../middlewares/validateSchema.js");
const { loginSchema } = require("../schemas/user.js");
const recaptchaValidator = require("../middlewares/recaptchaValidator.js");

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión de usuario
 *     tags:
 *       - Authentication
 *     description: Permite a un usuario iniciar sesión proporcionando su correo electrónico, contraseña y un token de ReCAPTCHA. Si las credenciales son válidas, se devuelve un token de autenticación.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Inicio de sesión exitoso para el usuario Juan. Hora de inicio de sesión: 10:30:00"
 *                 token:
 *                   type: string
 *                   nullable: true
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Error de validación de datos o reCAPTCHA inválido
 *       401:
 *         description: Credenciales incorrectas
 *       500:
 *         description: Error interno del servidor o de base de datos
 */
router.post("/login", sanitizeRequestBody, validateRequestSchema(loginSchema), recaptchaValidator, authController.login);

module.exports = router;
