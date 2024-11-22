const express = require("express");
const router = express.Router();

const ServicioController = require("../controllers/servicios.js");

router.get('/', ServicioController.getAll);
router.post('/', ServicioController.create);

module.exports = router;