const db = require("../models/index.js");
const User = db.User;
const { ValidationError } = require("sequelize");
const {
  documentSchema,
  userUpdateSelfSchema,
  adminUpdateUserSchema,
} = require("../schemas/user.js");
const enabledRoles = ["admin"];
const fs = require("fs");
const path = require("path");

class UsuarioController {
  //Obtiene todos los usuarios activos
  async getAllActive(req, res) {
    try {
      const users = await User.findAll({
        where: { status: "activo" },
        attributes: { exclude: ["password"] },
      });
      if (users.length === 0) {
        return res.status(404).json({
          message: "No hay usuarios activos / No active users found",
        });
      }
      const processedUsers = users.map((user) => {
        const userData = user.toJSON();
        try {
          const filePath = path.join(
            __dirname,
            "..",
            "uploads",
            "temp",
            userData.image
          );

          if (userData.image && fs.existsSync(filePath)) {
            userData.image = `${req.protocol}://${req.get(
              "host"
            )}/uploads/temp/${userData.image}`;
          } else {
            userData.image = null;
          }
        } catch (err) {
          console.error(
            "Error al leer el archivo / Error reading file:",
            err.message
          );
        }
        return userData;
      });
      res.status(200).json({
        message:
          "Usuarios activos obtenidos correctamente / Active users retrieved successfully",
        users: processedUsers,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener los usuarios / Error retrieving users",
        error: error.message,
      });
    }
  }
  //Obtiene todos los usuarios paginados
  async getAllPaginated(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;

      const { rows: users, count: totalUsers } = await User.findAndCountAll({
        attributes: { exclude: ["password"] },
        limit,
        offset,
      });

      const processedUsers = users.map((user) => {
        const userData = user.toJSON();
        try {
          const filePath = path.join(
            __dirname,
            "..",
            "uploads",
            "temp",
            userData.image
          );

          if (userData.image && fs.existsSync(filePath)) {
            userData.image = `${req.protocol}://${req.get(
              "host"
            )}/uploads/temp/${userData.image}`;
          } else {
            userData.image = null;
          }
        } catch (err) {
          console.error(
            "Error al leer el archivo / Error reading file:",
            err.message
          );
        }
        return userData;
      });

      const totalPages = Math.ceil(totalUsers / limit);

      res.status(200).json({
        message:
          "Usuarios obtenidos correctamente / Users retrieved successfully",
        users: processedUsers,
        currentPage: page,
        totalPages,
        totalUsers,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener los usuarios / Error retrieving users",
        error: error.message,
      });
    }
  }

  async getById(req, res) {
    try {
      const user = await User.findByPk(req.params.id, {
        include: ["services"],
      });
      if (!user) {
        return res.status(404).json({
          message: "Usuario no encontrado / User not found",
        });
      }

      const filePath = path.join(
        __dirname,
        "..",
        "uploads",
        "temp",
        user.image
      );

      let imageBase = null;

      try {
        if (user.image && fs.existsSync(filePath)) {
          const imageBuffer = fs.readFileSync(filePath);
          imageBase = imageBuffer.toString("base64");
        }
      } catch (err) {
        console.error(
          "Error al leer el archivo / Error reading file:",
          err.message
        );
      }

      const { password, ...userInfo } = user.toJSON();
      res.status(200).json({
        message: "Usuario obtenido correctamente / User retrieved successfully",
        ...userInfo,
        image: imageBase ? `data:image/jpeg;base64,${imageBase}` : null,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener el usuario / Error retrieving user",
        error: error.message,
      });
    }
  }

  async getByDocument(req, res) {
    try {
      const { documentNumber } = await documentSchema.parseAsync(req.params);
      const user = await User.findOne({
        where: { documentNumber },
      });
      if (!user) {
        return res.status(404).json({
          message: "Usuario no encontrado / User not found",
        });
      }
      const { password, ...userInfo } = user.toJSON();
      res.status(200).json({
        message: "Usuario obtenido correctamente / User retrieved successfully",
        user: userInfo,
      });
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(400).json({
          message: "Error de validación / Validation error",
          errors: error.errors,
        });
      } else {
        res.status(500).json({
          message: "Error al obtener el usuario / Error retrieving user",
          error: error.message,
        });
      }
    }
  }

  async update(req, res) {
    try {
      const userId = req.params.id || req.user.id;
      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).json({
          message: "Usuario no encontrado / User not found",
        });
      }

      let userData;

      if (enabledRoles.includes(req.user.role)) {
        userData = await adminUpdateUserSchema.parseAsync(req.body);
      } else {
        userData = await userUpdateSelfSchema.parseAsync(req.body);
      }

      if (req.file) {
        userData.image = req.file.filename;
      }
      await user.update(userData, { where: { id: userId } });

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
      } else {
        res.status(500).json({
          message: "Error al actualizar el usuario / Error updating user",
          error: error.message,
        });
      }
    }
  }

  async delete(req, res) {
    try {
      const userFound = await User.findByPk(req.params.id);
      if (!userFound) {
        return res.status(404).json({
          message: "Usuario no encontrado / User not found",
        });
      }
      await userFound.update({ status: "inactivo", updatedAt: new Date() });
      res.status(200).json({
        message: "Usuario eliminado correctamente / User deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: "Error al eliminar el usuario / Error deleting user",
        error: error.message,
      });
    }
  }

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
            "Ningún usuario ha creado servicios / No users have created services",
        });
      }
      res.status(200).json({
        message:
          "Usuarios obtenidos correctamente / Users retrieved successfully",
        users,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener los usuarios / Error retrieving users",
        error: error.message,
      });
    }
  }
}

module.exports = new UsuarioController();
