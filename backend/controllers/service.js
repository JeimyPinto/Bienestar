const serviceService = require("../services/service.js");
const { createAuditLog } = require("../services/auditLog.js");

class ServiceController {
  async getAll(req, res, next) {
    try {
      const services = await serviceService.getAllServices();
      if (services.length === 0) {
        const error = new Error("No se encontraron servicios");
        error.status = 404;
        error.details = { services: null };
        throw error;
      }
      res.status(200).json({
        message: "Servicios recuperados con éxito",
        services,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllActive(req, res, next) {
    try {
      const services = await serviceService.getAllActiveServices();
      if (services.length === 0) {
        const error = new Error("No se encontraron servicios activos");
        error.status = 404;
        error.details = { services: [] };
        throw error;
      }
      res.status(200).json({
        message: "Servicios activos recuperados con éxito",
        services,
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const service = await serviceService.getServiceById(req.params.id);
      if (!service) {
        const error = new Error("Servicio no encontrado");
        error.status = 404;
        error.details = { service: null };
        throw error;
      }
      res.status(200).json({
        message: "Servicio recuperado con éxito",
        service,
      });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const service = await serviceService.createService(req.body, req.file);
      await createAuditLog({
        entity_type: "Service",
        entity_id: service.id,
        action: "CREATE",
        old_data: null,
        new_data: service.toJSON(),
        changed_by: req.user?.id || null,
      });
      res.status(201).json({
        message: "Servicio creado con éxito",
        service,
      });
    } catch (error) {
      serviceService.removeUploadedFile(req.file);
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { oldService, updatedService } = await serviceService.updateServiceWithAudit(req.params.id, req.body, req.file);
      await createAuditLog({
        entity_type: "Service",
        entity_id: updatedService.id,
        action: "UPDATE",
        old_data: oldService,
        new_data: updatedService,
        changed_by: req.user?.id || null,
      });
      res.status(200).json({
        message: "Servicio actualizado con éxito",
        service: updatedService,
      });
    } catch (error) {
      serviceService.removeUploadedFile(req.file);
      next(error);
    }
  }

  async getByUserId(req, res, next) {
    try {
      const userId = req.params.id;
      const services = await serviceService.getServicesByUserId(userId);
      if (services.length === 0) {
        const error = new Error("No se encontraron servicios para este usuario");
        error.status = 404;
        error.details = { services: [] };
        throw error;
      }
      res.status(200).json({
        message: "Servicios recuperados con éxito para el usuario",
        services,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ServiceController();
