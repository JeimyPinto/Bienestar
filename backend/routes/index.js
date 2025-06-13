const express = require("express");
const router = express.Router();
const userRoutes = require("./user.js");
const authRouter = require("./auth.js");
const serviceRoutes = require("./service.js");
const requestRoutes = require("./request.js");
const { authenticateToken, authorizeRoles } = require("../middlewares/auth");

router.get("/", (req, res) => {
  res.status(200).send({
    message: "Bienvenido a la API de Bienestar. Este endpoint es solo para pruebas de verificación de conexión a la API.",
    environment: process.env.NODE_ENV || "development"
  });
});
router.use("/auth", authRouter);
router.use("/users", authenticateToken, userRoutes);
router.use("/services", serviceRoutes);
router.use("/requests", authenticateToken, requestRoutes);

module.exports = router;