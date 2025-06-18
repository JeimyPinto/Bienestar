// =======================
// Librerías de terceros
// =======================
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const path = require("path");

// =======================
// Inicialización de Router
// =======================
const router = express.Router();

// =======================
// Rutas
// =======================
const userRoutes = require("./user.js");
const authRouter = require("./auth.js");
const serviceRoutes = require("./service.js");
const requestRoutes = require("./request.js");
const auditLogRoutes = require("./audit_log.js");
const groupRoutes = require("./group.js");

// =======================
// Middlewares / Utilidades
// =======================
const { authenticateToken } = require("../middlewares/auth");

// =======================
// Rutas principales
// =======================

/**
 * @openapi
 * /:
 *   get:
 *     summary: Bienvenida a la API de Bienestar
 *     tags:
 *       - General
 *     description: Endpoint de prueba para verificar la conexión con la API. Devuelve un mensaje de bienvenida y el entorno actual.
 *     responses:
 *       200:
 *         description: Mensaje de bienvenida
 *         content:
 *           application/json:
 *             example:
 *               message: Bienvenido a la API de Bienestar. Este endpoint es solo para pruebas de verificación de conexión a la API.
 *               environment: development
 */
router.get("/", (req, res) => {
  res.status(200).send({
    message: "Bienvenido a la API de Bienestar. Este endpoint es solo para pruebas de verificación de conexión a la API.",
    environment: process.env.NODE_ENV || "development"
  });
});

// Rutas de autenticación
router.use("/auth", authRouter);

// Rutas de usuarios (requiere autenticación y roles ADMIN, SUPERADMIN o INSTRUCTOR)
router.use(
  "/users",
  authenticateToken,
  userRoutes
);

// Rutas de servicios (públicas)
router.use("/services", serviceRoutes);

// Rutas de solicitudes (requiere autenticación)
router.use("/requests", authenticateToken, requestRoutes);

// Rutas de auditoría general
router.use("/audit-logs", auditLogRoutes);

// Rutas de grupos (requiere autenticación y roles ADMIN, SUPERADMIN o INSTRUCTOR)
router.use(
  "/groups",
  authenticateToken,
  groupRoutes
);

// =======================
// Documentación Swagger automática con swagger-jsdoc
// =======================
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerJsdocConfig = require("../swagger-jsdoc.config");
const swaggerSpec = swaggerJSDoc(swaggerJsdocConfig);
router.use("/auto-docs", authenticateToken, swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// =======================
// Exportación del router
// =======================
module.exports = router;