import { Sequelize } from 'sequelize';

/**
 * Conexión a la base de datos
 * @type {Sequelize}
 * @param {string} process.env.DB_DATABASE Nombre de la base de datos
 * @param {string} process.env.DB_USER Usuario de la base de datos
 * @param {string} process.env.DB_PASSWORD Contraseña de la base de datos
 * @param {string} process.env.DATABASE_HOST Host de la base de datos, dialecto y puerto
 */
export const db = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DATABASE_HOST,
      dialect: process.env.DATABASE_DIALECT,
      port: process.env.DATABASE_PORT,
    }
);