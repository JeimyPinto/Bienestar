// =======================
// Librerías de terceros
// =======================
const express = require("express");

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
const userAuditRoutes = require("./user_audit.js");

// =======================
// Middlewares / Utilidades
// =======================
const { authenticateToken } = require("../middlewares/auth");

// =======================
// Rutas principales
// =======================

// Ruta de prueba de conexión
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

// Rutas de auditoría de usuario
router.use("/user-audit", userAuditRoutes);

// =======================
// Exportación del router
// =======================
module.exports = router;