import { Model } from 'sequelize';

export default class SolicitudRemision extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // Definir asociación
    SolicitudRemision.belongsTo(models.Aprendiz, { foreignKey: 'aprendizId' });
    SolicitudRemision.belongsTo(models.Integrante, { foreignKey: 'integranteId' });
  }
}

// Inicialización del modelo
SolicitudRemision.init({
  area: DataTypes.STRING,
  aprendizId: DataTypes.INTEGER,
  integranteId: DataTypes.INTEGER
}, {
  sequelize,
  modelName: 'SolicitudRemision',
  tableName: 'SolicitudRemision',
});

