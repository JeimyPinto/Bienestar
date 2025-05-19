const db = require("../models/index.js");
const User = db.User;
const { ValidationError } = require("sequelize");
const {
  userUpdateSelfSchema,
  adminUpdateUserSchema, adminCreateUserSchema
} = require("../schemas/user.js");
const enabledRoles = ["admin", "integrante"];
class UsuarioController {
  async getAll(req, res) {
    try {
      const users = await User.findAll({
        include: {
          association: "services",
          required: true,
        }
      });
      if (users.length === 0) {
        return res.status(404).json({
          message: "No hay usuarios / No users found",
        });
      }
      res.status(200).json({
        message:
          "Usuarios activos obtenidos correctamente / Active users retrieved successfully",
        users: processUsers(users, req),
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error al obtener los usuarios / Error retrieving users",
        error: error.message,
      });
    }
  }

  //Obtiene todos los usuarios activos
  async getAllActive(req, res) {
    try {
      const users = await User.findAll({
        include: {
          association: "services",
          required: true,
        },
        where: { status: "activo" },
      });
      if (users.length === 0) {
        return res.status(404).json({
          message: "No hay usuarios activos / No active users found",
        });
      }
      res.status(200).json({
        message:
          "Usuarios activos obtenidos correctamente / Active users retrieved successfully",
        users: processUsers(users, req),
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
        limit,
        offset,
        include: {
          association: "services",
          required: true,
        },
      });
      const totalPages = Math.ceil(totalUsers / limit);
      res.status(200).json({
        message:
          "Usuarios obtenidos correctamente / Users retrieved successfully",
        users: users,
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
        include: [
          {
            association: "services",
            attributes: { exclude: ["creatorId"] },
          },
        ],
      });
      if (!user) {
        return res.status(404).json({
          message: "Usuario no encontrado / User not found",
        });
      }
      res.status(200).json({
        message: "Usuario obtenido correctamente / User retrieved successfully",
        user,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener el usuario / Error retrieving user",
        error: error.message,
      });
    }
  }
  async create(req, res) {
    try {
      const userData = await adminCreateUserSchema.parseAsync(req.body);
      const hashedPassword = await User.hashPassword(userData.password);
      const user = await User.create({
        fisrtName,
        lastName,
        documentType,
        documentNumber,
        phone,
        email,
        password: hashedPassword,
        status: "activo",
        role,
        image,
      });
      res.status(201).json({
        message: "Usuario creado correctamente / User created successfully",
        user,
      });
    } catch (error) {
      if (error.errors) {
        // Error de validación del esquema
        res.status(400).json({
          message: "Error de validación / Validation error",
          errors: error.errors,
        });
      } else {
        res.status(500).json({
          message: "Error al crear el usuario / Error creating user",
          error: error.message,
        });
      }
    }
  }

  async update(req, res) {
    try {
      const userId = req.params.id;
      const user = await User.findByPk(userId)
      if (!user) {
        return res.status(404).json({
          message: "Usuario no encontrado / User not found",
        });
      }

      //Pasar por el esquema de validación correspondiente al rol
      let userData;
      if (enabledRoles.includes(req.user.role)) {
        userData = await adminUpdateUserSchema.parseAsync(req.body);
      } else {
        userData = await userUpdateSelfSchema.parseAsync(req.body);
      }

      await user.update(userData, { where: { id: userId } });
      res.status(200).json({
        message: "Usuario actualizado correctamente / User updated successfully",
        user,
      });
    } catch (error) {
      if (error.errors) {
        // Error de validación del esquema
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
