'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Service.belongsTo(models.User, {
        foreignKey: 'creatorId',
        as: 'creator',
      });
    }
  }
  Service.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      creatorId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'User',
          key: 'id',
        },
      },
      area: {
        type: DataTypes.ENUM,
        values: [
          'Salud',
          'Arte y Cultura',
          'Deporte y Recreación',
          'Apoyo Socioeconomico y Reconocimiento a la Excelencia',
          'Apoyo Psicosocial',
        ],
      },
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Service',
    }
  );
  return Service;
};