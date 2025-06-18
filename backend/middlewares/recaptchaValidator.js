const { verifyRecaptcha } = require("../helpers/verifyRecaptcha");

/**
 * Middleware para validar el token de Google reCAPTCHA enviado en el body.
 * Si el token es válido, permite continuar; si no, responde con error 400.
 */
async function recaptchaValidator(req, res, next) {
  try {
    const { recaptchaToken } = req.body;
    if (!recaptchaToken) {
      const error = new Error("Falta el token de reCAPTCHA");
      error.status = 400;
      error.details = { field: "recaptchaToken" };
      throw error;
    }
    const responseRecaptcha = await verifyRecaptcha(recaptchaToken);
    if (!responseRecaptcha || !responseRecaptcha.success) {
      const error = new Error("Token de reCAPTCHA inválido");
      error.status = 400;
      error.details = { field: "recaptchaToken" };
      throw error;
    }
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = recaptchaValidator;
