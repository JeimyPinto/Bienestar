const express = require("express");
const router = express.Router();
const fileController = require("../controllers/file.js");
const {upload} = require("../config/multer.js");

router.post("/", upload.single('image'), fileController.upload);
module.exports = router;