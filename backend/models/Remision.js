import { Model } from 'sequelize';

export default class Remision extends Model {
  static associate(models) {
    // Definir asociaciones
    Remision.belongsTo(models.Aprendiz, { foreignKey: 'aprendizId' });
    Remision.belongsTo(models.Integrante, { foreignKey: 'integranteId' });
  }

  static init(sequelize, DataTypes) {
    return super.init({
      estado: DataTypes.STRING,
      aprendizId: DataTypes.INTEGER,
      integranteId: DataTypes.INTEGER
    }, {
      sequelize,
      modelName: 'Remision',
      tableName: 'Remision'
    });
  }
}
