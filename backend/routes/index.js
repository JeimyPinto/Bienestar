const express = require("express");
const router = express.Router();
const authRouter = require("./auth.js");

router.get("/", (req, res) => {
  res.status(200).send({ message: "Bienvenido a la API de Bienestar" });
});
router.use("/auth", authRouter);
module.exports = router;
