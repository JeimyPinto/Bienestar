const { sendWelcomeMailIfProd } = require("../services/mail.js");
const chalk = require("chalk");

module.exports = async function sendWelcomeMail(req, res, next) {
  console.log(chalk.blue("🎯 Middleware sendWelcomeMail ejecutado"));
  
  // Si no hay usuario en res.locals, significa que hubo un error antes
  // En este caso, pasar al siguiente middleware sin hacer nada
  if (!res.locals.user) {
    return next();
  }
  
  try {
    const user = res.locals.user;
    const plainPassword = req.body.password && req.body.password.trim() !== "" ? req.body.password : req.body.documentNumber;
    
    // Enviar correo
    await sendWelcomeMailIfProd(user, plainPassword);
    
    // Preparar respuesta para el siguiente middleware
    res.locals.statusCode = 201;
    res.locals.responseData = {
      message: res.locals.createMessage,
      user,
    };
    
    next();
  } catch (error) {
    // Si falla el correo, aún preparar respuesta de éxito
    console.warn(chalk.red("⚠️ Error en middleware sendWelcomeMail:"), chalk.yellow(error.message));
    
    res.locals.statusCode = 201;
    res.locals.responseData = {
      message: res.locals.createMessage + " (Correo no enviado)",
      user: res.locals.user,
    };
    
    next();
  }
};
