import { Model } from 'sequelize';

export default class Aprendiz extends Model {
  static associate(models) {
    Aprendiz.belongsTo(models.Usuario, { foreignKey: 'usuarioId' });
    Aprendiz.belongsTo(models.Ficha, { foreignKey: 'fichaId' });
    Aprendiz.hasMany(models.SolicitudRemision, { foreignKey: 'aprendizId' });
  }

  static init(sequelize, DataTypes) {
    return super.init({
      usuarioId: DataTypes.INTEGER,
      fichaId: DataTypes.INTEGER
    }, {
      sequelize,
      modelName: 'Aprendiz',
      tableName: 'Aprendiz'
    });
  }
}
