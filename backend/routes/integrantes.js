const express = require("express");
const router = express.Router();

const IntegranteController = require("../controllers/integrantes");

router.get('/', IntegranteController.getAll);
router.post('/', IntegranteController.create);

module.exports = router;