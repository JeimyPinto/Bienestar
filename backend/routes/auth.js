const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.js");
const sanitizeRequestBody = require("../middlewares/sanitizeInput.js");
const validateRequestSchema = require("../middlewares/validateSchema.js");
const { loginSchema } = require("../schemas/user.js");
const recaptchaValidator = require("../middlewares/recaptchaValidator.js");

router.post("/login", sanitizeRequestBody, validateRequestSchema(loginSchema), recaptchaValidator, authController.login);

module.exports = router;
