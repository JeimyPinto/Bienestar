import fs from 'fs';
import path from 'path';
import { Sequelize } from 'sequelize';
import { fileURLToPath, pathToFileURL } from 'url';
import * as sequelizerc from '../sequelizerc.js';

// Obtener el nombre del archivo actual y su directorio
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Obtener las rutas desde sequelizerc.js
const configPath = sequelizerc.config;
const modelsPath = sequelizerc.modelsPath;
const env = process.env.NODE_ENV || 'development';

// Leer la configuración de la base de datos
const config = JSON.parse(fs.readFileSync(configPath))[env];
const db = {};

// Inicializar la conexión a la base de datos
let sequelize;
if (process.env.DB_USE_ENV_VARIABLE) {
  sequelize = new Sequelize(process.env[process.env.DB_USE_ENV_VARIABLE], config);
} else {
  sequelize = new Sequelize(
    process.env.DB_DATABASE || config.database,
    process.env.DB_USERNAME || config.username,
    process.env.DB_PASSWORD || config.password,
    {
      host: process.env.DB_HOST || config.host,
      dialect: process.env.DB_DIALECT || config.dialect,
    }
  );
}

// Leer todos los archivos de modelos en el directorio de modelos
const modelFiles = fs
  .readdirSync(modelsPath)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file.slice(-3) === '.js');
  });

// Importar e inicializar cada modelo
for (const file of modelFiles) {
  const modelPath = pathToFileURL(path.join(modelsPath, file)).href;
  const model = await import(modelPath);
  db[model.default.name] = model.default.init(sequelize, Sequelize.DataTypes);
}

// Configurar las asociaciones entre modelos, si existen
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Añadir la instancia de Sequelize y la clase Sequelize al objeto db
db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;