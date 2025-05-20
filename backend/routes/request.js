const express = require("express");
const router = express.Router();
const requestController = require("../controllers/request.js");

router.get("/", requestController.getAll);
router.get("/active", requestController.getAllActive);
router.get("/:id", requestController.getById);
router.post("/", requestController.create);
router.put("/:id", requestController.update);
router.delete("/:id", requestController.delete);

module.exports = router;
