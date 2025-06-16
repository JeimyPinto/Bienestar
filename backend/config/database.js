async function connectDB(sequelize) {
  try {
    await sequelize.authenticate();
    console.log(`Conexión a la base de datos exitosa: ${process.env.NODE_ENV === 'production' ? process.env.PROD_DB_NAME : process.env.DEV_DB_NAME}`);
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
    throw error;
  }
}

module.exports = { connectDB };