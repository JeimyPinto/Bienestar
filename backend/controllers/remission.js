const remissionService = require("../services/remission");

const RemissionController = {
  async create(req, res, next) {
    try {
      const value = req.body;
      // Verifica que la solicitud esté aprobada antes de crear la remisión
      const remission = await remissionService.createRemission(value, req.user?.id || null);
      
      // Almacenar la remisión en res.locals para el middleware de notificación
      res.locals.remission = remission;
      
      res.status(201).json({
        message: "Remisión creada con éxito",
        remission,
      });
    } catch (error) {
      next(error);
    }
  },

  async getAll(req, res, next) {
    try {
      const remissions = await remissionService.getAllRemissions();
      if (!remissions || remissions.length === 0) {
        const error = new Error("No se encontraron remisiones");
        error.status = 404;
        error.details = { remissions: [] };
        throw error;
      }
      res.status(200).json({
        message: "Remisiones recuperadas con éxito",
        remissions,
      });
    } catch (error) {
      next(error);
    }
  },

  async getById(req, res, next) {
    try {
      const remission = await remissionService.getRemissionById(req.params.id);
      if (!remission) {
        const error = new Error("Remission not found");
        error.status = 404;
        throw error;
      }
      res.status(200).json({
        message: "Remisión recuperada con éxito",
        remission,
      });
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const value = req.body;
      const remission = await remissionService.updateRemission(id, value, req.user?.id || null);
      if (!remission) {
        const err = new Error("Remission not found");
        err.status = 404;
        throw err;
      }
      res.status(200).json({
        message: "Remisión actualizada con éxito",
        remission,
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = RemissionController;
