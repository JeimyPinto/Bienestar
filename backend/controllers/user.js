const db = require("../models/index.js");
const User = db.User;
const { ValidationError, DatabaseError } = require("sequelize");
const {
  documentSchema,
  userUpdateSelfSchema,
  adminUpdateUserSchema,
} = require("../schemas/user.js");
const enabledRoles = ["admin"];
const fs = require("fs");
const path = require("path");
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
   * Incluye los datos del usuario y la imagen de perfil codificada en base64.
   * @param {*} req.params.id ID del usuario a buscar
   * @param {*} res Respuesta HTTP
   * @returns {Promise<void>} Retorna una promesa que resuelve en una respuesta HTTP
   * @since 31/10/2024
   * @version 31/03/2025
   * @autor Jeimy Pinto
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

      const filePath = path.join(
        __dirname,
        "..",
        "uploads",
        "images",
        "profile",
        req.params.id,
        user.image
      );
      console.log("Ruta de la imagen construida:", filePath);
      let imageBase = null;

      try {
        if (user.image && fs.existsSync(filePath)) {
          console.log("Archivo encontrado, leyendo...");
          const imageBuffer = fs.readFileSync(filePath);
          imageBase64 = imageBuffer.toString("base64");
          console.log("Imagen codificada en base64:", imageBase64.substring(0, 50));
        } else {
          console.log("Archivo no encontrado o no especificado.");
        }
      } catch (err) {
        console.error("Error al leer la imagen:", err.message);
      }

      const { password, ...userInfo } = user.toJSON();
      res.status(200).json({
        ...userInfo,
        image: imageBase ? `data:image/jpeg;base64,${imageBase}` : null,
      });
    } catch (error) {
      console.error("Error en el controlador getById:", error.message);
      res.status(500).json({
        message: "Error al obtener el usuario / Error retrieving user",
        error: error.message,
      });
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
   * Actualizar un usuario por ID o el usuario autenticado.
   * Maneja tanto la actualización de datos como la subida de la imagen de perfil.
   * @param {*} req.body Datos del usuario a actualizar.
   * @param {*} req.file Archivo de imagen subido (opcional).
   * @param {*} res Respuesta HTTP.
   * @returns {Promise<void>} Retorna una promesa que resuelve en una respuesta HTTP.
   * @version 31/03/2025
   * @autor Jeimy Pinto
   * @since 18/03/2025
   */
  async update(req, res) {
    try {
      const userId = req.params.id || req.user.id;
      const user = await User.findByPk(userId);

      if (!user) {
        return res
          .status(404)
          .json({ message: "Usuario no encontrado / User not found" });
      }

      let userData;

      //Validar el esquema de actualización segun el rol del usuario
      if (enabledRoles.includes(req.user.role)) {
        userData = await adminUpdateUserSchema.parseAsync(req.body);
      } else {
        userData = await userUpdateSelfSchema.parseAsync(req.body);
      }

      //Manejar la subida de la imagen de perfil (si existe)
      if (req.file) {
        userData.image = req.file.filename;
      }
      await user.update(userData, { where: { id: userId } });
      //Retornar el usuario actualizado (sin la contraseña para roles no admin)
      if (enabledRoles.includes(req.user.role)) {
        res.status(200).json({
          message:
            "Usuario actualizado correctamente / User updated successfully",
          user: userData,
        });
      } else {
        const { password, ...userInfo } = user.toJSON();
        res.status(200).json({
          message:
            "Usuario actualizado correctamente / User updated successfully",
          user: userInfo,
        });
      }
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
          message:
            "No users have created services / Ningún usuario ha creado servicios",
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
