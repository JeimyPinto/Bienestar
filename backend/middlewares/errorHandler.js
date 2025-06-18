function errorHandler(err, req, res) {
  // Si es un error personalizado
  if (err.status && err.message) {
    return res.status(err.status).json({
      message: err.message,
      details: err.details || null,
    });
  }
  // Error de base de datos de Sequelize
  if (err.name === "SequelizeDatabaseError") {
    return res.status(500).json({
      message: "Error de base de datos",
      details: err.message,
    });
  }
  // Otros errores
  console.error(err);
  res.status(500).json({
    message: "Error interno del servidor",
    details: err.message || null,
  });
}

module.exports = errorHandler;
