const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarios.js");

router.get("/", usuarioController.getAll);
router.get("/:id", usuarioController.getById);
router.get("/documento/:documento", usuarioController.getByDocumento);
router.post("/", usuarioController.create);
router.put("/:id", usuarioController.update);
router.delete("/:id", usuarioController.delete);

module.exports = router;
