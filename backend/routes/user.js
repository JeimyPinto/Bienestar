const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.js");

router.get("/", userController.getAll);
router.get("/active", userController.getAllActive);
router.get("/paginated", userController.getAllPaginated);
router.get("/withServices", userController.getUsersWithServices);
router.get("/:id", userController.getById);
router.post("/", userController.create);
router.put("/:id", userController.update);
router.delete("/:id", userController.delete);


module.exports = router;
