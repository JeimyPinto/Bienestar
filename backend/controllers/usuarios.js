const db = require("../models/index.js");
const Usuario = db.Usuario;
const usuarioSchema = require("../schemas/usuario.js");
const { z } = require("zod");

class UsuarioController {
  /**
   * Obtener todos los usuarios de la base de datos
   * @param {*} res Status 200: Retorna un json con todos los usuarios
   * @version 31/10/2024
   */
  async getAll(req, res) {
    try {
      console.log("Obteniendo usuarios");
      const usuarios = await Usuario.findAll();
      res.status(200).json(usuarios);
    } catch (error) {
      if (error instanceof ValidationError) {
        res
          .status(400)
          .json({ message: "Error de validación", errors: error.errors });
      } else if (error instanceof DatabaseError) {
        res
          .status(500)
          .json({ message: "Error de base de datos", error: error.message });
      } else {
        res
          .status(500)
          .json({
            message: "Error al obtener los usuarios",
            error: error.message,
          });
      }
    }
  }

  /**
   * Obtener un usuario por ID
   * @param {*} req.params.id ID del usuario a buscar
   * @param {*} res Status 200: Retorna un json con el usuario encontrado sin la contraseña
   * @version 31/10/2024
   */
  async getById(req, res) {
    try {
      const usuario = await Usuario.findByPk(req.params.id);
      if (!usuario) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      const { contrasena, ...usuarioDatos } = usuario.toJSON();
      res.status(200).json(usuarioDatos);
    } catch (error) {
      if (error instanceof ValidationError) {
        res
          .status(400)
          .json({ message: "Error de validación", errors: error.errors });
      } else if (error instanceof DatabaseError) {
        res
          .status(500)
          .json({ message: "Error de base de datos", error: error.message });
      } else {
        res
          .status(500)
          .json({
            message: "Error al obtener el usuario",
            error: error.message,
          });
      }
    }
  }

  /**
   * Obtener un usuario por documento
   * @param {*} req.params.documento Documento del usuario a buscar
   * @param {*} res Status 200: Retorna un json con el usuario encontrado sin la contraseña
   * @version 31/10/2024
   */
  async getByDocumento(req, res) {
    try {
      const usuario = await Usuario.findOne({
        where: { documento: req.params.documento },
      });
      if (!usuario) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      const { contrasena, ...usuarioDatos } = usuario.toJSON();
      res.status(200).json(usuarioDatos);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener el usuario", error });
    }
  }
  /**
   * Crear un usuario, valida los datos del usuario a crear y lo guarda en la base de datos
   * @param {*} req.body Datos del usuario a crear
   * @param {*} res Status 201: Retorna un json con el usuario creado sin la contraseña o
   * Status 400: Retorna un json con el mensaje de error
   */
  async create(req, res) {
    try {
      const { nombre, apellido, documento, telefono, email, contrasena } =
        usuarioSchema.parse(req.body);
      const usuario = await Usuario.create({
        nombre,
        apellido,
        documento,
        telefono,
        email,
        contrasena,
      });
      const { contrasena: contrasenaUsuario, ...usuarioDatos } =
        usuario.toJSON();
      res.status(201).json(usuarioDatos);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors = error.errors.map((err) => err.message);
        return res.status(400).json({ message: formattedErrors });
      } else {
        res.status(500).json({ message: "Error al crear el usuario", error });
      }
    }
  }
  /**
   * Actualizar un usuario por ID, valida los datos del usuario
   * a actualizar y lo guarda en la base de datos
   * @param {*} req.params.id ID del usuario a actualizar
   * @param {*} req.body Datos del usuario a actualizar
   * @param {*} res Status 200: Retorna un json con el usuario actualizado sin la contraseña o
   * Status 400: Retorna un json con el mensaje de error
   * @version 31/10/2024
   */
  async update(req, res) {
    try {
      const { id } = req.params;
      const usuarioEncontrado = await Usuario.findByPk(id);
      if (!usuarioEncontrado) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      // Validara los datos del usuario (nombre, apellido, documento, telefono, email, contrasena)
      const usuarioValidado = usuarioSchema.parse(req.body);

      // actualiza los datos del usuario
      await usuarioEncontrado.update(usuarioValidado);

      // Excluye la contraseña del usuario actualizado
      const { contrasena, ...usuarioDatos } = usuarioEncontrado.toJSON();
      res.status(200).json(usuarioDatos);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors = error.errors.map((err) => err.message);
        return res.status(400).json({ message: formattedErrors });
      } else {
        res
          .status(500)
          .json({ message: "Error al actualizar el usuario", error });
      }
    }
  }
  /**
   * Eliminar un usuario por ID
   * @param {*} req.params.id ID del usuario a eliminar
   * @param {*} res Status 204: Retorna un json vacío o
   * Status 404: Retorna un json con el mensaje de error
   * @version 31/10/2024
   */
  async delete(req, res) {
    try {
      const { id } = req.params;
      const usuarioEncontrado = await Usuario.findByPk(id);
      if (!usuarioEncontrado) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      const usuarioEliminado = await this.update({ estado: "inactivo" });
      res.status(204).json(usuarioEliminado);
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar el usuario", error });
    }
  }
}

module.exports = new UsuarioController();
