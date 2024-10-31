const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarios.js");

/**
 * Ruta para obtener todos los usuarios
 */
router.get("/", usuarioController.getAll);
/**
 * Ruta para obtener un usuario por ID
 */
router.get("/:id", usuarioController.getById);
/**
 * Ruta para obtener un usuario por documento
 */
router.get("/documento/:documento", usuarioController.getByDocumento);
/**
 * Ruta para crear un usuario
 */
router.post("/", usuarioController.create);
/**
 * Ruta para actualizar un usuario por ID 
 */
router.put("/:id", usuarioController.update);
/**
 * Ruta para eliminar un usuario por ID
 */
router.delete("/:id", usuarioController.delete);

module.exports = router;
