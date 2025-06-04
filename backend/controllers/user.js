const { enabledRoles } = require("../utils/enabledRoles.js");
const db = require("../models/index.js");
const bcrypt = require("bcrypt");
const User = db.User;
const FileController = require("./file.js");
const {
  userUpdateSelfSchema,
  adminUpdateUserSchema, adminCreateUserSchema
} = require("../schemas/user.js");
const saltRounds = 10;

class UsuarioController {
  async getAll(req, res) {
    try {
      const users = await User.findAll({
        include: {
          association: "services"
        }
      });
      if (users.length === 0) {
        return res.status(404).json({
          message: "No hay usuarios / No users found",
        });
      }
      res.status(200).json({
        message: "Usuarios obtenidos correctamente / Users retrieved successfully",
        users,
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
          required: false,
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

  /**
   * Crea un nuevo usuario. Solo usuarios con roles habilitados pueden crear usuarios.
   * Si no se proporciona contraseña, se usa el número de documento como contraseña.
   * Si se proporciona una imagen, se maneja la carga usando FileController.
   */
  async create(req, res) {
    if (!req.user || !req.user.role) {
      return res.status(401).json({ message: "No autenticado / Not authenticated" });
    }
    if (!enabledRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: "No autorizado / Not authorized",
        role: req.user.role,
      });
    }
    // Verifica si el usuario autenticado tiene el rol adecuado
    if (!enabledRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: "No autorizado / Not authorized",
        role: req.user.role,
      });
    }
    try {

      const userData = await adminCreateUserSchema.parseAsync(req.body);

      // Si password está vacío o no viene, usar documentNumber como password
      const plainPassword = userData.password && userData.password.trim() !== ""
        ? userData.password
        : userData.documentNumber;
      const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);

      const user = await User.create({
        firstName: userData.firstName,
        lastName: userData.lastName,
        documentType: userData.documentType,
        documentNumber: userData.documentNumber,
        phone: userData.phone,
        email: userData.email,
        password: hashedPassword,
        status: "activo",
        role: userData.role,
        image: null, // temporalmente null
      });

      if (req.file) {
        // Si se proporciona una imagen, usar FileController para manejar la carga
        const fileResponse = FileController.upload(req, res);
        if (fileResponse.ok)
          user.image = fileResponse.destination + "/" + fileResponse.filename;
        user.update({ image: user.image });
      }
      else
        return res.status(500).json({
          message: "Error al cargar la imagen / Error uploading image",
          error: fileResponse.error,
        });
      res.status(201).json({
        message: "Usuario creado correctamente / User created successfully",
        user,
      });
    } catch (error) {
      if (error.errors) {
        res.status(400).json({
          error: "Error de validación / Validation error () " + error.errors.map(e => e.message).join(", "),
        });
      } else {
        res.status(500).json({
          error: "Error al crear el usuario / Error creating user (" + error.message + ")",
        });
      }
    }
  }

  async update(req, res) {
    try {
      const userId = req.params.id;
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({
          message: "Usuario no encontrado / User not found",
          role: req.user.role,
        });
      }

      let userData;
      let passwordHash;
      if (enabledRoles.includes(req.user.role)) {
        userData = await adminUpdateUserSchema.parseAsync(req.body);
        passwordHash = bcrypt.hashSync(userData.password, saltRounds);
        await user.update({
          firstName: userData.firstName,
          lastName: userData.lastName,
          documentType: userData.documentType,
          documentNumber: userData.documentNumber,
          phone: userData.phone,
          email: userData.email,
          password: passwordHash,
          status: userData.status,
          role: userData.role,
          image: userData.image,
        });
        res.status(200).json({
          message: "Usuario actualizado correctamente por " + req.user.role + " / User updated successfully by " + req.user.role,
          user,
        });
      } else {
        userData = await userUpdateSelfSchema.parseAsync(req.body);
        passwordHash = bcrypt.hashSync(userData.password, saltRounds);
        // Solo permitir actualizar phone, email, image y password
        const updateFields = {};
        if (userData.phone !== undefined) updateFields.phone = userData.phone;
        if (userData.email !== undefined) updateFields.email = userData.email;
        if (userData.image !== undefined) updateFields.image = userData.image;
        if (userData.password !== undefined) {
          updateFields.password = passwordHash;
        }

        await user.update(updateFields);

        // Excluir la contraseña del usuario al devolver los datos
        const { password, ...userWithoutPassword } = user.get({ plain: true });
        res.status(200).json({
          message: "Usuario actualizado correctamente por " + req.user.role + " / User updated successfully by " + req.user.role,
          user: userWithoutPassword,
        });
      }
    } catch (error) {
      if (error.errors) {
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

  //No se elimina el usuario, solo se cambia el estado a inactivo
  async delete(req, res) {
    try {
      const userId = req.params.id;
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({
          message: "Usuario no encontrado / User not found",
          role: req.user.role,
        });
      }
      await user.update({ status: "inactivo" });
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

  // async getUsersWithServices(req, res) {
  //   try {
  //     const users = await User.findAll({
  //       include: {
  //         association: "services",
  //         required: true,
  //       },
  //     });

  //     if (users.length === 0) {
  //       return res.status(404).json({
  //         message:
  //           "Ningún usuario ha creado servicios / No users have created services",
  //       });
  //     }
  //     res.status(200).json({
  //       message:
  //         "Usuarios obtenidos correctamente / Users retrieved successfully",
  //       users,
  //     });
  //   } catch (error) {
  //     res.status(500).json({
  //       message: "Error al obtener los usuarios / Error retrieving users",
  //       error: error.message,
  //     });
  //   }
  // }
}

module.exports = new UsuarioController();
