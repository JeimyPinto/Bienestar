const chalk = require("chalk");

async function connectDB(sequelize) {
  try {
    await sequelize.authenticate();
    const dbName = process.env.NODE_ENV === "production" ? process.env.PROD_DB_NAME : process.env.DEV_DB_NAME;
    console.log(chalk.green.bold("✅ Conexión a la base de datos exitosa:"), chalk.cyan(dbName));
  } catch (error) {
    console.error(chalk.red.bold("❌ No se pudo conectar a la base de datos:"), chalk.red(error.message));
    throw error;
  }
}

module.exports = { connectDB };