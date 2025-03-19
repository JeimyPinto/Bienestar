const db = require("../models/index.js");
const User = db.User;
const { ValidationError, DatabaseError } = require("sequelize");
const {
  documentSchema,
  userUpdateSelfSchema,
  adminUpdateUserSchema,
} = require("../schemas/user.js");

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
   * @param {*} res Status 200: Retorna un json con el usuario encontrado sin la contraseña o
   * @returns {Promise<void>} Retorna una promesa que resuelve en una respuesta HTTP
   * @version 31/10/2024
   */
  async getById(req, res) {
    try {
      const user = await User.findByPk(req.params.id, {
        include: {
          association: "services",
          required: false,
        },
      });
      if (!user) {
        return res
          .status(404)
          .json({ message: "Usuario no encontrado / User not found" });
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
        return res
          .status(404)
          .json({ message: "Usuario no encontrado / User not found" });
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
   * Actualizar un usuario por ID (para administradores)
   * @param {*} req.params.id ID del usuario a actualizar
   * @param {*} req.body Datos del usuario a actualizar
   * @param {*} res Status 200: Retorna un json con el usuario actualizado sin la contraseña o
   * Status 400: Retorna un json con el mensaje de error
   * @version 18/03/2025
   */
  async update(req, res) {
    try {
      const userFound = await User.findByPk(req.params.id);
      if (!userFound) {
        return res
          .status(404)
          .json({ message: "Usuario no encontrado / User not found" });
      }

      let parsedData;
      try {
        parsedData = await adminUpdateUserSchema.parseAsync(req.body);
      } catch (validationError) {
        console.error("Validation error:", validationError);
        return res.status(400).json({
          message: "Error de validación / Validation error",
          errors: validationError.errors,
        });
      }

      const {
        firstName,
        lastName,
        documentType,
        documentNumber,
        phone,
        email,
        password,
        status,
        role,
        image,
      } = parsedData;
      let passwordHashed = userFound.password;
      if (password) {
        passwordHashed = await bcrypt.hash(password, 10);
      }

      // Actualizar usuario
      const updatedUser = await userFound.update({
        firstName,
        lastName,
        documentType,
        documentNumber,
        phone,
        email,
        password: passwordHashed,
        status,
        role,
        image,
        updatedAt: new Date(),
      });

      res.status(200).json({
        message: "Succesfull User Updated  / Usuario actualizado correctamente",
        usuario: updatedUser,
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
          message: "Error al actualizar el usuario / Error updating user",
          error: error.message,
        });
      }
    }
  }

  /**
   * Actualizar un usuario por ID (para usuarios)
   * @param {*} req.params.id ID del usuario a actualizar
   * @param {*} req.body Datos del usuario a actualizar
   * @param {*} res Status 200: Retorna un json con el usuario actualizado sin la contraseña o
   * Status 400: Retorna un json con el mensaje de error
   * @version 18/03/2025
   */
  async updateSelf(req, res) {
    try {
      const userFound = await User.findByPk(req.params.id);
      if (!userFound) {
        return res
          .status(404)
          .json({ message: "Usuario no encontrado / User not found" });
      }

      let parsedData;
      try {
        parsedData = await userUpdateSelfSchema.parseAsync(req.body);
      } catch (validationError) {
        console.error("Validation error:", validationError);
        return res.status(400).json({
          message: "Error de validación / Validation error",
          errors: validationError.errors,
        });
      }

      const { phone, email, password, image } = parsedData;
      let passwordHashed = userFound.password;
      if (password) {
        passwordHashed = await bcrypt.hash(password, 10);
      }

      // Actualizar usuario excepto documentNumber, documentType, role, firstName, lastName
      const updatedUser = await userFound.update({
        phone,
        email,
        password: passwordHashed,
        image,
        updatedAt: new Date(),
      });

      // No retornar la contraseña
      const { password: _, ...userInfo } = updatedUser.toJSON();
      res.status(200).json({
        message: "Usuario actualizado correctamente",
        usuario: userInfo,
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
          message: "Error al actualizar el usuario / Error updating user",
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
   * @returns {Promise<void>} Retorna una promesa que resuelve en una respuesta HTTP
   * @version 31/10/2024
   */
  async delete(req, res) {
    try {
      const userFound = await User.findByPk(req.params.id);
      if (!userFound) {
        return res
          .status(404)
          .json({ message: "Usuario no encontrado / User not found" });
      }
      await userFound.update({ status: "inactivo", updatedAt: new Date() });
      res.status(204).json();
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
          message: "Error al eliminar el usuario / Error deleting user",
          error: error.message,
        });
      }
    }
  }

  /**
   * Obtene una lista de usuarios que hayan creado servicios
   * @param {*} req Objeto de solicitud HTTP
   * @param {*} res Objeto de respuesta HTTP
   * @returns {Promise<void>} Retorna una promesa que resuelve en una respuesta HTTP
   * @version 31/10/2024
   * @autor Jeimy Pinto
   */
  async getUsersWithServices(req, res) {
    try {
      const users = await User.findAll({
      include: {
        association: "services",
        required: true,
      },
      });

      if (users.length === 0) {
      return res.status(404).json({
        message: "No users have created services / Ningún usuario ha creado servicios",
      });
      }
      res.status(200).json(users);
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
          message: "Error al obtener los usuarios / Error retrieving users",
          error: error.message,
        });
      }
    }
  }
}

module.exports = new UsuarioController();
