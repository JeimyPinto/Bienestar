/**
 * @swagger
 * components:
 *   schemas:
 *     LoginRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - recaptchaToken
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: usuario@ejemplo.com
 *         password:
 *           type: string
 *           example: contraseña123
 *         recaptchaToken:
 *           type: string
 *           example: "recaptcha-token-ejemplo"
 */
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.js");
const authController = require("../controllers/auth.js");
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Iniciar sesión de usuario
 *     tags:
 *       - Auth
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
 *                   example: Login successful / Inicio de sesión exitoso
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 error:
 *                   type: string
 *                   nullable: true
 *       400:
 *         description: Error de validación o reCAPTCHA inválido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   nullable: true
 *                   example: null
 *                 token:
 *                   type: string
 *                   nullable: true
 *                   example: null
 *                 error:
 *                   type: string
 *                   example: Validation error / Error de validación ( ... ) o Invalid reCAPTCHA token / Token de reCAPTCHA inválido
 *       401:
 *         description: Credenciales incorrectas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   nullable: true
 *                   example: null
 *                 token:
 *                   type: string
 *                   nullable: true
 *                   example: null
 *                 error:
 *                   type: string
 *                   example: Incorrect email or password / Correo electrónico o contraseña incorrectos
 *                 errorField:
 *                   type: string
 *                   example: email
 *       500:
 *         description: Error interno del servidor durante el login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   nullable: true
 *                 token:
 *                   type: string
 *                   nullable: true
 *                 error:
 *                   type: string
 *                   example: Error during login / Error durante el inicio de sesión ( ... )
 */
router.post("/login", authController.login);
/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Cerrar sesión de usuario
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cierre de sesión exitoso
 *       401:
 *         description: No autorizado
 */
router.post("/logout", authMiddleware.authenticateToken, authController.logout);

module.exports = router;
