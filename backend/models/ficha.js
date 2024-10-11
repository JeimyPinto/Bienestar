import { Model } from 'sequelize';

export default class Ficha extends Model {
  static associate(models) {
    Ficha.hasMany(models.Aprendiz, { foreignKey: 'fichaId' });
    Ficha.hasMany(models.Instructor, { foreignKey: 'fichaId' });
  }

  static init(sequelize, DataTypes) {
    return super.init({
      numero: DataTypes.STRING,
      jornada: DataTypes.STRING
    }, {
      sequelize,
      modelName: 'Ficha',
      tableName: 'Ficha'
    });
  }
}
