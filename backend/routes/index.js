const express = require("express");
const router = express.Router();
const usuarioRouter = require("./usuarios.js");
const authRouter = require("./auth.js");
const { authenticateToken } = require("../middlewares/auth");

/**
 * Ruta de bienvenida de la API
 */
router.get("/", (req, res) => {
  res.status(200).send({ message: "Bienvenido a la API de Bienestar" });
});
router.use("/usuarios", authenticateToken, usuarioRouter);
router.use("/auth", authRouter);

module.exports = router;
