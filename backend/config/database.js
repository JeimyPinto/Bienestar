const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: parseInt(process.env.DB_PORT, 10),
  }
);

function connectDB() {
  return sequelize.authenticate()
    .then(() => {
      console.log('Conexión a la base de datos exitosa');
      return sequelize;
    })
    .catch((error) => {
      console.error('No se pudo conectar con la base de datos:', error);
      throw error;
    });
}

module.exports = { connectDB, sequelize };