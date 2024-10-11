import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Remision extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Remision.belongsTo(models.Aprendiz, { foreignKey: 'aprendizId' });
      Remision.belongsTo(models.Integrante, { foreignKey: 'integranteId' });
    }
  }
  Remision.init({
    estado: DataTypes.STRING,
    aprendizId: DataTypes.INTEGER,
    integranteId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Remision',
    tableName: 'Remision'
  });
  return Remision;
};