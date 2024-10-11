import { Model } from 'sequelize';

export default class Instructor extends Model {
  static associate(models) {
    Instructor.belongsTo(models.Usuario, { foreignKey: 'usuarioId' });
    Instructor.belongsTo(models.Ficha, { foreignKey: 'fichaId' });
  }

  static init(sequelize, DataTypes) {
    return super.init({
      usuarioId: DataTypes.INTEGER,
      es_gestor: DataTypes.BOOLEAN,
      fichaId: DataTypes.INTEGER
    }, {
      sequelize,
      modelName: 'Instructor',
      tableName: 'Instructor'
    });
  }
}
