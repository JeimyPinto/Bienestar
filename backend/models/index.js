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

const configJson = require(__dirname + "/../config/config.json");
const dbConfig = configJson[env];

// Verificar que la configuración existe
if (!dbConfig) {
  throw new Error(`No se encontró configuración para el entorno: ${env}`);
}

// Reemplaza variables tipo ${VAR} por process.env.VAR
Object.keys(dbConfig).forEach(key => {
  if (typeof dbConfig[key] === "string" && dbConfig[key].startsWith("${") && dbConfig[key].endsWith("}")) {
    const varName = dbConfig[key].slice(2, -1);
    dbConfig[key] = process.env[varName];
  }
});

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
