const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.js");

router.get("/", userController.getAll);
router.get("/id/:id", userController.getById);
router.get("/document/:documentNumber", userController.getByDocument);

module.exports = router;
