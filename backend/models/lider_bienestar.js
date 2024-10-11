import { Model } from 'sequelize';

export default class Lider_Bienestar extends Model {
  static associate(models) {
    // Definir asociaciones
    Lider_Bienestar.belongsTo(models.Usuario, { foreignKey: 'usuarioId' });
    Lider_Bienestar.hasMany(models.Integrante, { foreignKey: 'liderId' });
  }

  static init(sequelize, DataTypes) {
    return super.init({
      usuarioId: DataTypes.INTEGER
    }, {
      sequelize,
      modelName: 'Lider_Bienestar',
      tableName: 'lider_bienestar'
    });
  }
}
