// ==================== LIBRERÍAS ====================
const fs = require("fs");
// ==================== MODELOS ====================
const db = require("../models/index.js");
const User = db.User;
// ==================== HERRAMIENTAS / UTILIDADES ====================
const saveUserImage = require("../utils/saveUserImage.js");
const { canCreateRole, getAllowedUpdateFields } = require("../helpers/user.js");
const { hashPassword } = require("../helpers/hash.js");

class UsuarioController {
  async getAll(req, res, next) {
    try {
      const users = await User.findAll({
        include: [
          { association: "services", required: false },
          { association: "requests", required: false },
        ],
      });

      if (users.length === 0) {
        const error = new Error("No hay usuarios registrados");
        error.status = 404;
        error.details = { users: [] };
        throw error;
      }

      res.status(200).json({
        message: "Usuarios obtenidos correctamente",
        users,
      });

    } catch (error) {
      next(error);
    }
  }

  async getAllActive(req, res, next) {
    try {
      const users = await User.findAll({
        include: [
          { association: "services", required: false },
          { association: "requests", required: false },
        ],
        where: { status: "activo" },
      });
      if (users.length === 0) {
        const error = new Error("No hay usuarios activos registrados");
        error.status = 404;
        error.details = { users: [] };
        throw error;
      }
      res.status(200).json({
        message:
          "Usuarios activos obtenidos correctamente",
        users: users,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllPaginated(req, res, next) {
      try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;
        const { rows: users, count: totalUsers } = await User.findAndCountAll({
          limit,
          offset,
          include: [
          { association: "services" },
          { association: "requests" },
        ],
        });
        const totalPages = Math.ceil(totalUsers / limit);
        res.status(200).json({
          message:
            "Usuarios obtenidos correctamente",
          users: users,
          currentPage: page,
          totalPages,
          totalUsers,
        });
      } catch (error) {
        next(error);
      }
    }

  async getById(req, res, next) {
      try {
        const user = await User.findByPk(req.params.id, {
          include: [
            {
              association: [
                "services",
                "requests",
              ],
              required: false,
            },
          ],
        });
        if (!user) {
          const error = new Error("Usuario no encontrado");
          error.status = 404;
          error.details = { user: null };
          throw error;
        }
        res.status(200).json({
          message: "Usuario obtenido correctamente",
          user,
        });
      } catch (error) {
        next(error);
      }
    }

  async create(req, res, next) {
    try {
      const creatorRole = req.user?.role;
      const requestedRole = req.body.role;
      if (!canCreateRole(creatorRole, requestedRole)) {
        const error = new Error("No tienes permisos para crear usuarios con roles distintos a 'user'");
        error.status = 403;
        error.details = { creatorRole, requestedRole };
        throw error;
      }
      // Ya validado por middleware: req.body
      const userData = req.body;
      // Si password está vacío o no viene, usar documentNumber como password
      const plainPassword = userData.password && userData.password.trim() !== ""
        ? userData.password
        : userData.documentNumber;
      const hashedPassword = await hashPassword(plainPassword);

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
        groupId: userData.groupId ?? null,
        image: null // nunca tomar del body
      });

      if (req.file) {
        await saveUserImage(user, req.file);
      }
      // Guardar usuario en res.locals para auditoría y otros middlewares
      res.locals.user = user;
      res.status(201).json({
        message: "Usuario creado correctamente",
        user,
      });
    } catch (error) {
      // Eliminar archivo subido si existe y hubo error
      if (req.file) {
        try {
          fs.unlinkSync(req.file.path);
        } catch (err) {
          console.warn("No se pudo eliminar el archivo subido tras error:", err.message);
        }
      }
      next(error);
    }
    }


  async update(req, res, next) {
      try {
        const userId = req.params.id;
        const user = await User.findByPk(userId);
        if (!user) {
          const error = new Error("Usuario no encontrado");
          error.status = 404;
          throw error;
        }
        let updateFields = getAllowedUpdateFields(req.user?.role, req.body);
        updateFields.password = await hashPassword(updateFields.password, user.password);
        if (req.file) {
          await saveUserImage(user, req.file);
          updateFields.image = req.file.filename;
        }
        const oldUserData = user.get({ plain: true });
        await user.update(updateFields);
        res.locals.user = user;
        res.locals.oldUserData = oldUserData;
        res.status(200).json({
          message: `Usuario actualizado correctamente por ${req.user.firstName} ${req.user.lastName} / User updated successfully by ${req.user.firstName} ${req.user.lastName} `,
          user: user,
        });
      } catch (error) {
        // Eliminar archivo subido si existe y hubo error
        if (req.file) {
          try {
            fs.unlinkSync(req.file.path);
          } catch (err) {
            console.warn("No se pudo eliminar el archivo subido tras error:", err.message);
          }
        }
        next(error);
      }
    }
  }

module.exports = new UsuarioController();
