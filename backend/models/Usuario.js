import { Model, DataTypes } from 'sequelize';

export default class Usuario extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part de Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // Definir asociaciones
    Usuario.hasMany(models.Lider_Bienestar, { foreignKey: 'usuarioId' });
    Usuario.hasMany(models.Aprendiz, { foreignKey: 'usuarioId' });
    Usuario.hasMany(models.Instructor, { foreignKey: 'usuarioId' });
    Usuario.hasMany(models.Integrante, { foreignKey: 'usuarioId' });
  }
}

// Inicialización del modelo
Usuario.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: DataTypes.STRING,
  apellido: DataTypes.STRING,
  telefono: DataTypes.STRING,
  email: DataTypes.STRING,
  contrasena: DataTypes.STRING
}, {
  sequelize,
  modelName: 'Usuario',
  tableName: 'Usuario',
});

