const chalk = require("chalk");

function errorHandler(err, req, res) {
  // Determinar mensaje legible
  let message = err.message;
  if (!message || message === "null") {
    if (typeof err.details === "string") {
      message = err.details;
    } else if (err.details && typeof err.details === "object") {
      // Si details es un objeto, lo convertimos a string legible
      message = Object.entries(err.details)
        .map(([key, val]) => `${key}: ${val}`)
        .join("; ");
    } else {
      message = "Ocurrió un error inesperado.";
    }
  }

  // Si es un error personalizado
  if (err.status) {
    return res.status(err.status).json({
      error: true,
      message,
      details: err.details || null,
    });
  }
  // Error de base de datos de Sequelize
  if (err.name === "SequelizeDatabaseError") {
    return res.status(500).json({
      error: true,
      message: "Error de base de datos",
      details: err.message,
    });
  }
  // Otros errores
  console.error(chalk.red.bold("💥 Error interno del servidor:"), chalk.red(err.message || err));
  res.status(500).json({
    error: true,
    message: message || "Error interno del servidor",
    details: err.message || null,
  });
}

module.exports = errorHandler;
