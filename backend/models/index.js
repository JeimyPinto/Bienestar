"use strict";

require("dotenv").config();
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);

// Determinar el entorno desde las variables de entorno
const env = process.env.NODE_ENV || "development";
console.log("NODE_ENV detectado:", env);

// Configuración directa sin archivo JSON (más confiable para Render)
const config = {
  development: {
    username: process.env.DEV_DB_USER || "bienestar_app",
    password: process.env.DEV_DB_PASSWORD || "$vvgD?78f0Li",
    database: process.env.DEV_DB_NAME || "bienestar_app",
    host: process.env.DEV_DB_HOST || "127.0.0.1",
    dialect: "mysql",
    port: 3306
  },
  production: {
    use_env_variable: "DATABASE_URL",
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
};

const dbConfig = config[env];

// Verificar que la configuración existe
if (!dbConfig) {
  throw new Error(`No se encontró configuración para el entorno: ${env}`);
}

console.log("Entorno:", env);
console.log("Base de datos configurada:", dbConfig);

const db = {};

let sequelize;
if (dbConfig.use_env_variable) {
  const connectionString = process.env[dbConfig.use_env_variable];
  if (!connectionString) {
    throw new Error(`Variable de entorno ${dbConfig.use_env_variable} no encontrada`);
  }
  console.log("Usando variable de entorno para conexión:", dbConfig.use_env_variable);
  sequelize = new Sequelize(connectionString, dbConfig);
} else {
  sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    dbConfig
  );
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;