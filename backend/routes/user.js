const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.js");
const { uploadUser } = require("../config/multer.js");

router.get("/", userController.getAll);
router.get("/active", userController.getAllActive);
router.get("/paginated", userController.getAllPaginated);
router.get("/:id", userController.getById);
router.post("/", uploadUser.single("file"), userController.create);
router.put("/:id", userController.update);
router.delete("/:id", userController.delete);


module.exports = router;
