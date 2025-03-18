const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.js");
const { authenticateToken, authorizeRole } = require("../middlewares/auth.js");

router.get("/", userController.getAll,authorizeRole());
router.get("/id/:id", userController.getById);
router.get("/document/:documentNumber", userController.getByDocument);
router.put("/update/:id", userController.update);
router.delete("/delete/:id", userController.delete);
module.exports = router;
