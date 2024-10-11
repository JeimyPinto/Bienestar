import { Model } from 'sequelize';

export default class Servicio extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // Definir asociación
    Servicio.belongsTo(models.Integrante, { foreignKey: 'encargadoId' });
  }
}

// Inicialización del modelo
Servicio.init({
  nombre: DataTypes.STRING,
  encargadoId: DataTypes.INTEGER
}, {
  sequelize,
  modelName: 'Servicio',
  tableName: 'Servicio'
});

