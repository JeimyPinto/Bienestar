import fs from 'fs';
import path from 'path';
import { Sequelize } from 'sequelize';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../config/config.json')))[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: process.env.DB_DIALECT,
    }
  );
}

const modelFiles = fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  });

for (const file of modelFiles) {
  const model = await import(path.join(__dirname, file));
  const modelName = model.default.name;
  db[modelName] = model.default.init(sequelize, Sequelize.DataTypes);
}

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
