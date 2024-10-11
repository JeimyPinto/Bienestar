import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Aprendiz extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Aprendiz.belongsTo(models.Usuario, { foreignKey: 'usuarioId' });
      Aprendiz.belongsTo(models.Ficha, { foreignKey: 'fichaId' });
      Aprendiz.hasMany(models.SolicitudRemision, { foreignKey: 'aprendizId' });
    }
  }
  Aprendiz.init({
    usuarioId: DataTypes.INTEGER,
    fichaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Aprendiz',
    tableName: 'Aprendiz'
  });
  return Aprendiz;
};