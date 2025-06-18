const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.js");
const sanitize = require("../middlewares/sanitize.js");
const validate = require("../middlewares/validation.js");
const { loginSchema } = require("../schemas/user.js");
const recaptcha = require("../middlewares/recaptcha.js");

router.post("/login", sanitize, validate(loginSchema), recaptcha, authController.login);

module.exports = router;
