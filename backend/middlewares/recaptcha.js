// middlewares/recaptcha.js
const { verifyRecaptcha } = require("../utils/verifyRecaptcha");

module.exports = async function recaptchaMiddleware(req, res, next) {
  try {
    const { recaptchaToken } = req.body;
    if (!recaptchaToken) {
      const error = new Error("Falta el token de reCAPTCHA");
      error.status = 400;
      error.details = { field: "recaptchaToken" };
      throw error;
    }
    const responseRecaptcha = await verifyRecaptcha(recaptchaToken);
    if (!responseRecaptcha) {
      const error = new Error("Token de reCAPTCHA inválido");
      error.status = 400;
      error.details = { field: "recaptchaToken" };
      throw error;
    }
    next();
  } catch (error) {
    next(error);
  }
};
