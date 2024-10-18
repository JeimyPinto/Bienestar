const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: parseInt(process.env.DB_PORT, 10),
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida correctamente.');
    await sequelize.sync({ force: false });
    console.log('Modelos sincronizados con la base de datos.');
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
    process.exit(1); // Salir del proceso si no se puede conectar a la base de datos
  }
};

module.exports = { sequelize, connectDB };