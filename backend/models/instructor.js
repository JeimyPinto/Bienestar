'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Instructor extends Model {
    static associate(models) {
      Instructor.belongsTo(models.Usuario, { foreignKey: 'usuarioId' });
    }
  }
  Instructor.init({
    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    es_gestor: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    fichaId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Instructor',
    tableName: 'Instructores',
    timestamps: true
  });
  return Instructor;
};