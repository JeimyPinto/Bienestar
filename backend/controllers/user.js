const db = require("../models/index.js");
const User = db.User;
const { ValidationError, DatabaseError } = require("sequelize");
const { documentSchema } = require("../schemas/user.js");

class UsuarioController {
  /**
   * Obtener todos los usuarios de la base de datos que estén activos
   * @param {*} req Objeto de solicitud HTTP
   * @param {*} res Objeto de respuesta HTTP
   * @returns {Promise<void>} Retorna una promesa que resuelve en una respuesta HTTP
   * @version 31/10/2024
   */
  async getAll(req, res) {
    try {
      const users = await User.findAll({
        where: { status: "activo" },
        // Excluye el campo "password" de los resultados
        attributes: { exclude: ["password"] },
      });
      res.status(200).json(users);
    } catch (error) {
      // Manejo de errores de validación
      if (error instanceof ValidationError) {
        res
          .status(400)
          .json({ message: "Error de validación", errors: error.errors });
        // Manejo de errores de base de datos
      } else if (error instanceof DatabaseError) {
        res
          .status(500)
          .json({ message: "Error de base de datos", error: error.message });
        // Manejo de otros errores
      } else {
        res.status(500).json({
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
   * @returns {Promise<void>} Retorna una promesa que resuelve en una respuesta HTTP
   * @version 31/10/2024
   */
  async getById(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res
          .status(404)
          .json({ message: "Usuario no encontrado / User not found" });
      }
      const { password, ...userInfo } = user.toJSON();
      res.status(200).json(userInfo);
    } catch (error) {
      if (error instanceof ValidationError) {
        res
          .status(400)
          .json({
            message: "Error de validación / Validation error",
            errors: error.errors,
          });
      } else if (error instanceof DatabaseError) {
        res
          .status(500)
          .json({
            message: "Error de base de datos / Database error",
            error: error.message,
          });
      } else {
        res.status(500).json({
          message: "Error al obtener el usuario / Error retrieving user",
          error: error.message,
        });
      }
    }
  }

  /**
   * Obtener un usuario por documento
   * @param {*} req.params.documentNumber Número de documento del usuario a buscar
   * @param {*} res Status 200: Retorna un json con el usuario encontrado sin la contraseña
   * @returns {Promise<void>} Retorna una promesa que resuelve en una respuesta HTTP
   * @version 31/10/2024
   */
  async getByDocument(req, res) {
    try {
      const { documentNumber } = await documentSchema.parseAsync(req.params);
      const user = await User.findOne({
        where: { documentNumber },
      });
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado / User not found" });
      }
      const { password, ...userInfo } = user.toJSON();
      res.status(200).json(userInfo);
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(400).json({
          message: "Error de validación / Validation error",
          errors: error.errors,
        });
      } else if (error instanceof DatabaseError) {
        res.status(500).json({
          message: "Error de base de datos / Database error",
          error: error.message,
        });
      } else {
        res.status(500).json({
          message: "Error al obtener el usuario / Error retrieving user",
          error: error.message,
        });
      }
    }
  }
/**
   * Crear un usuario, valida los datos del usuario a crear y lo guarda en la base de datos
   * @param {*} req.body Datos del usuario a crear
   * @param {*} res Status 201: Retorna un json con el usuario creado sin la contraseña o
   * Status 400: Retorna un json con el mensaje de error
   */
  async create(req, res) {
    let parsedData;
    try {
      parsedData = await usuarioCreateSchema.parseAsync(req.body);
    } catch (validationError) {
      console.error("Error de validación:", validationError);
      return res.status(400).json({
        message: "Error de validación",
        errors: validationError.errors,
      });
    }
    try {
      const existingUser = await Usuario.findOne({
        where: { documento: parsedData.documento },
      });
      if (existingUser) {
        if (existingUser.estado === "inactiva") {
          return res.status(400).json({
            message:
              "El usuario ya existe. La cuenta del usuario está inactiva",
          });
        } else {
          return res.status(400).json({ message: "El usuario ya existe" });
        }
      }
      const contrasenaPorDefecto = parsedData.documento;
      const contrasenaEncriptada = await bcrypt.hash(contrasenaPorDefecto, 10);

      const usuario = await Usuario.create({
        ...parsedData,
        contrasena: contrasenaEncriptada,
      });

      const { contrasena: contrasenaUsuario, ...usuarioDatos } =
        usuario.toJSON();
      res.status(201).json({
        message: "Usuario creado correctamente",
        usuario: usuarioDatos,
      });
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
          .json({ message: "Error al crear el usuario", error: error.message });
      }
    }
  }

  /**
   * Actualizar un usuario por ID, valida los datos del usuario
   * @param {*} req.params.id ID del usuario a actualizar
   * @param {*} req.body Datos del usuario a actualizar
   * @param {*} res Status 200: Retorna un json con el usuario actualizado sin la contraseña o
   * Status 400: Retorna un json con el mensaje de error
   * @version 31/10/2024
   */
  async update(req, res) {
    try {
      const userFound = await Usuario.findByPk(req.params.id);
      if (!userFound) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      let parsedData;
      try {
        parsedData = await usuarioUpdateSchema.parseAsync(req.body);
      } catch (validationError) {
        console.error("Error de validación:", validationError);
        return res.status(400).json({
          message: "Error de validación",
          errors: validationError.errors,
        });
      }

      const { nombre, apellido, telefono, email, contrasena } = parsedData;
      let contrasenaEncriptada = userFound.contrasena;
      if (contrasena) {
        contrasenaEncriptada = await bcrypt.hash(contrasena, 10);
      }
      //No es posible actualizar el documento
      const usuario = await userFound.update({
        nombre,
        apellido,
        telefono,
        email,
        contrasena: contrasenaEncriptada,
      });
      //No se retorna la contraseña
      const { contrasena: contrasenaUsuario, ...usuarioDatos } =
        usuario.toJSON();
      res.status(200).json({
        message: "Usuario actualizado correctamente",
        usuario: usuarioDatos,
      });
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
        res.status(500).json({
          message: "Error al actualizar el usuario",
          error: error.message,
        });
      }
    }
  }
  /**
   * No se elimina el usuario, solo se cambia el estado a inactivo
   * @param {*} req.params.id ID del usuario a eliminar
   * @param {*} res Status 204: Retorna un json vacío o
   * Status 404: Retorna un json con el mensaje de error
   * @version 31/10/2024
   * @autor Jeimy Pinto
   */
  async delete(req, res) {
    try {
      const userFound = await Usuario.findByPk(req.params.id);
      if (!userFound) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      await userFound.update({ estado: "inactiva" });
      res.status(204).json();
    } catch (error) {
      if (error instanceof DatabaseError) {
        res
          .status(500)
          .json({ message: "Error de base de datos", error: error.message });
      } else {
        res.status(500).json({
          message: "Error al eliminar el usuario",
          error: error.message,
        });
      }
    }
  }
}

module.exports = new UsuarioController();
