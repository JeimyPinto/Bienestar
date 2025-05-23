const express = require("express");
const router = express.Router();

// Importar los controladores y middlewares
const userRoutes = require("./user.js");
const authRouter = require("./auth.js");
const serviceRoutes = require("./service.js");
const requestRoutes = require("./request.js");
const authMiddleware = require("../middlewares/auth.js");

router.get("/", (req, res) => {
  res.status(200).send({ message: "Bienvenido a la API de Bienestar" });
});
router.use("/auth", authRouter);
router.use("/users", authMiddleware.authenticateToken, authMiddleware.authorizeRole(), userRoutes);
router.use("/services", serviceRoutes);
router.use("/requests", authMiddleware.authenticateToken, requestRoutes);

module.exports = router;