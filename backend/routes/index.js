const express = require("express");
const router = express.Router();
const usuarioRouter = require("./usuarios.js");
const servicioRouter = require("./servicios.js");
const integranteRouter = require("./integrantes.js");
const authRouter = require("./auth.js");
const { authenticateToken } = require("../middlewares/auth");

router.get("/", (req, res) => {
  res.status(200).send({ message: "Bienvenido a la API de Bienestar" });
});
router.use("/usuarios", authenticateToken, usuarioRouter);
router.use("/auth", authRouter);
router.use("/integrantes", integranteRouter);
router.use("/servicios", servicioRouter);
router.get('/dashboard', authenticateToken, (req, res) => {
  res.status(200).send({ user: req.user });
});

module.exports = router;
