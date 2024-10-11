import { Model } from 'sequelize';

export default class Integrante extends Model {
  static associate(models) {
    Integrante.belongsTo(models.Usuario, { foreignKey: 'usuarioId' });
    Integrante.belongsTo(models.Lider_Bienestar, { foreignKey: 'liderId' });
    Integrante.hasMany(models.Remision, { foreignKey: 'integranteId' });
    Integrante.hasMany(models.Servicio, { foreignKey: 'encargadoId' });
    Integrante.hasMany(models.SolicitudRemision, { foreignKey: 'integranteId' });
  }

  static init(sequelize, DataTypes) {
    return super.init({
      area: DataTypes.STRING,
      usuarioId: DataTypes.INTEGER,
      liderId: DataTypes.INTEGER
    }, {
      sequelize,
      modelName: 'Integrante',
      tableName: 'Integrante'
    });
  }
}
