const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send({ message: "Bienvenido a la API de Bienestar" });
});
router.use("/auth", require("./auth.js"));
router.use("/users", require("./user.js"));
module.exports = router;
