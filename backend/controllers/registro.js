import Usuario from '../models/usuario.js';
import { Op } from 'sequelize';

class RegistroController {
  async create(req, res) {
    try {
      const { nombre, apellido, documento, telefono, email, contrasena } = req.body;

      // Verificar si el correo o el documento ya están registrados
      const existingUser = await Usuario.findOne({
        where: {
          [Op.or]: [{ email }, { documento }]
        }
      });

      if (existingUser) {
        if (existingUser.email === email) {
          throw new Error("El correo ya está registrado");
        }
        if (existingUser.documento === documento) {
          throw new Error("El documento ya está registrado");
        }
      }

      // Crear el usuario
      const usuario = await Usuario.create({
        nombre,
        apellido,
        documento,
        telefono,
        email,
        contrasena,
      });

      res.status(201).json(usuario);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default RegistroController;