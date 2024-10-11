const express = require("express");
const usuarioController = require("../controllers/usuario.js");

const router = express.Router();

router.get("/", usuarioController.index);
router.get('/register', usuarioController.store);

module.exports = router;