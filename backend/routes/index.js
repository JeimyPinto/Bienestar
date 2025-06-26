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
const auditLogRoutes = require("./audit_log.js");
const groupRoutes = require("./group.js");
const remissionsRoutes = require("./remission.js");
// =======================
// Middlewares / Utilidades
// =======================
const { authenticateToken ,authorizeRoles } = require("../middlewares/auth");

const ROLES = require("../constants/roles");


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

// Rutas de remisiones (requiere autenticación y roles ADMIN o SUPERADMIN)
router.use(
  "/remissions",
  authenticateToken,
  authorizeRoles(ROLES.ADMIN, ROLES.SUPERADMIN),
  remissionsRoutes
);

module.exports = router;