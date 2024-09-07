import { Sequelize } from "sequelize";
import { dbConfig } from "../config/dbConfig.js";
import {TipoUsuarioModel} from "./TipoUsuario.js";
import {ServicioModel} from "./Servicio.js";
import {UsuarioModel} from "./Usuario.js";
import {RemisionModel} from "./Remision.js";
import e from "express";

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.user,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle,
    },
  }
);

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.tipoUsuario = TipoUsuarioModel(sequelize, Sequelize);
db.servicio = ServicioModel(sequelize, Sequelize);
db.usuario = UsuarioModel(sequelize, Sequelize);
db.remision = RemisionModel(sequelize, Sequelize);

export {db};