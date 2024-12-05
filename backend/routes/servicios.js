const express = require("express");
const router = express.Router();
const ServicioController = require("../controllers/servicios");
const upload = require("../middlewares/upload");

router.get('/', ServicioController.getAll);
router.post("/", upload.single("imagen"), ServicioController.create);
router.put("/:id", upload.single("imagen"), ServicioController.update);

module.exports = router;