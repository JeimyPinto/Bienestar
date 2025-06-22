const userService = require("../services/user.js");
const { createAuditLog } = require("../services/auditLog.js");
class UsuarioController {
  async getAll(req, res, next) {
    try {
      const users = await userService.getAllUsers();
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
      const users = await userService.getAllActiveUsers();
      if (users.length === 0) {
        const error = new Error("No hay usuarios activos registrados");
        error.status = 404;
        error.details = { users: [] };
        throw error;
      }
      res.status(200).json({
        message: "Usuarios activos obtenidos correctamente",
        users,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllPaginated(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const { rows: users, count: totalUsers } = await userService.getAllPaginatedUsers(page, limit);
      const totalPages = Math.ceil(totalUsers / limit);
      res.status(200).json({
        message: "Usuarios obtenidos correctamente",
        users,
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
      const user = await userService.getUserById(req.params.id);
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
      const user = await userService.createUser(req.body, req.file, req.user?.role);
      res.locals.user = user;
      // Auditoría de creación
      await createAuditLog({
        entity_type: "User",
        entity_id: user.id,
        action: "CREATE",
        old_data: null,
        new_data: user.toJSON(),
        changed_by: req.user?.id || null,
      });
      res.status(201).json({
        message: "Usuario creado correctamente",
        user,
      });
    } catch (error) {
      userService.removeUploadedFile(req.file);
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { user, oldUserData } = await userService.updateUser(req.params.id, req.user, req.body, req.file);
      res.locals.user = user;
      res.locals.oldUserData = oldUserData;
      // Auditoría de actualización
      await createAuditLog({
        entity_type: "User",
        entity_id: user.id,
        action: "UPDATE",
        old_data: oldUserData,
        new_data: user.toJSON(),
        changed_by: req.user?.id || null,
      });
      res.status(200).json({
        message: `Usuario actualizado correctamente por ${req.user.firstName} ${req.user.lastName} `,
        user,
      });
    } catch (error) {
      userService.removeUploadedFile(req.file);
      next(error);
    }
  }
  async getAllByRole(req, res, next) {
    try {
      const role = req.params.role;
      const users = await userService.getUsersByRole(role);
      if (!users.length) {
        const error = new Error(`No hay usuarios con el rol '${role}' registrados`);
        error.status = 404;
        error.details = { users: [] };
        throw error;
      }
      res.status(200).json({
        message: `Usuarios con rol '${role}' obtenidos correctamente`,
        users,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UsuarioController();
