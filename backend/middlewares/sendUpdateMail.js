const { sendUpdateMailIfProd } = require("../services/mail.js");
const chalk = require("chalk");

module.exports = async function sendUpdateMail(req, res, next) {
  console.log(chalk.blue("🎯 Middleware sendUpdateMail ejecutado"));
  try {
    const user = res.locals.user;
    
    // Enviar correo
    await sendUpdateMailIfProd(user);
    
    // Preparar respuesta para el siguiente middleware
    res.locals.statusCode = 200;
    res.locals.responseData = {
      message: res.locals.updateMessage,
      user,
    };
    
    next();
  } catch (error) {
    // Si falla el correo, aún preparar respuesta de éxito
    console.warn(chalk.red("⚠️ Error en middleware sendUpdateMail:"), chalk.yellow(error.message));
    
    res.locals.statusCode = 200;
    res.locals.responseData = {
      message: res.locals.updateMessage + " (Correo no enviado)",
      user: res.locals.user,
    };
    
    next();
  }
};
