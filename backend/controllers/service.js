const db = require("../models/index.js");
const Service = db.Service;
const User = db.User;
const ErrorController = require("../controllers/error.js");
const { serviceSchema } = require("../schemas/service.js");

class ServiceController {
  async getAll(req, res) {
    try {
      const services = await Service.findAll({
        include: {
          association: "creator",
          model: User,
        },
      });
      if (services.length === 0) {
        throw new ErrorController(404, "No services found / No se encontraron servicios", { services: null });
      }
      res.status(200).json({
        message: "Services retrieved successfully / Servicios recuperados con éxito",
        error: null,
        details: null,
        services,
      });
    } catch (error) {
      if (error instanceof ErrorController) {
        return res.status(error.status).json({
          message: null,
          error: error.message,
          details: error.details || null,
          services: null,
        });
      }
      if (error.name === "SequelizeDatabaseError") {
        return res.status(500).json({
          message: null,
          error: "Database error / Error de base de datos",
          details: error.message,
          services: null,
        });
      }
      console.error(error);
      return res.status(500).json({
        message: null,
        error: "Internal server error / Error interno del servidor",
        details: error.message,
        services: null,
      });
    }
  }

  async getAllActive(req, res) {
    try {
      const services = await Service.findAll({
        where: { status: "activo" },
        include: {
          association: "creator",
          model: User,
        },
      });
      if (services.length === 0) {
        throw new ErrorController(404, "No se encontraron servicios activos", { services: [] });
      }
      res.status(200).json({
        message: "Active services retrieved successfully / Servicios activos recuperados con éxito",
        error: null,
        details: null,
        services,
      });
    } catch (error) {
      if (error instanceof ErrorController) {
        return res.status(error.status).json({
          message: null,
          error: error.message,
          details: error.details || null,
          services: null,
        });
      }
      if (error.name === "SequelizeDatabaseError") {
        return res.status(500).json({
          message: null,
          error: "Database error / Error de base de datos",
          details: error.message,
          services: null,
        });
      }
      console.error(error);
      return res.status(500).json({
        message: null,
        error: "Internal server error / Error interno del servidor",
        details: error.message,
        services: null,
      });
    }
  }

  async getById(req, res) {
    try {
      const service = await Service.findByPk(req.params.id, {
        include: {
          association: "creator",
          model: User,
        },
      });
      if (!service) {
        throw new ErrorController(404, "Service not found / Servicio no encontrado", { service: null });
      }
      res.status(200).json({
        message: "Service retrieved successfully / Servicio recuperado con éxito",
        error: null,
        details: null,
        service,
      });
    } catch (error) {
      if (error instanceof ErrorController) {
        return res.status(error.status).json({
          message: null,
          error: error.message,
          details: error.details || null,
          service: null,
        });
      }
      if (error.name === "SequelizeDatabaseError") {
        return res.status(500).json({
          message: null,
          error: "Database error / Error de base de datos",
          details: error.message,
          service: null,
        });
      }
      console.error(error);
      return res.status(500).json({
        message: null,
        error: "Internal server error / Error interno del servidor",
        details: error.message,
        service: null,
      });
    }
  }

  async create(req, res) {
    try {
      if (req.body.creatorId) {
        req.body.creatorId = Number(req.body.creatorId);
      }
      const serviceData = await serviceSchema.parseAsync(req.body);
      const service = await Service.create({
        ...serviceData,
        image: null,
      });
      if (req.file) {
        service.image = req.file.filename;
        await service.update({ image: service.image });
      }
      res.status(201).json({
        message: "Service created successfully / Servicio creado con éxito",
        error: null,
        details: null,
        service,
      });
    } catch (error) {
      // Errores de validación de Zod
      if (error.errors) {
        return res.status(400).json({
          message: null,
          error: "Validation Error / Error de Validación",
          details: error.errors,
          service: null,
        });
      }
      if (error instanceof ErrorController) {
        return res.status(error.status).json({
          message: null,
          error: error.message,
          details: error.details || null,
          service: null,
        });
      }
      if (error.name === "SequelizeDatabaseError") {
        return res.status(500).json({
          message: null,
          error: "Database error / Error de base de datos",
          details: error.message,
          service: null,
        });
      }
      console.error(error);
      res.status(500).json({
        message: null,
        error: "Internal server error / Error interno del servidor",
        details: error.message,
        service: null,
      });
    }
  }

  async update(req, res) {
    try {
      const serviceId = req.params.id;
      const service = await Service.findByPk(serviceId);
      if (!service) {
        throw new ErrorController(404, "Service not found / Servicio no encontrado", { service: null });
      }
      if (req.body.creatorId) {
        req.body.creatorId = Number(req.body.creatorId);
      }
      const serviceData = await serviceSchema.parseAsync(req.body);
      let updatedFields = { ...serviceData };
      if (req.file) {
        await service.update({ image: req.file.filename });
        updatedFields.image = req.file.filename;
      }
      await service.update(updatedFields);
      res.status(200).json({
        message: "Service updated successfully / Servicio actualizado con éxito",
        error: null,
        details: null,
        service: { ...service.toJSON(), ...updatedFields },
      });
    } catch (error) {
      if (error.errors) {
        return res.status(400).json({
          message: null,
          error: "Validation Error / Error de Validación",
          details: error.errors,
          service: null,
        });
      }
      if (error instanceof ErrorController) {
        return res.status(error.status).json({
          message: null,
          error: error.message,
          details: error.details || null,
          service: null,
        });
      }
      if (error.name === "SequelizeDatabaseError") {
        return res.status(500).json({
          message: null,
          error: "Database error / Error de base de datos",
          details: error.message,
          service: null,
        });
      }
      console.error(error);
      res.status(500).json({
        message: null,
        error: "Internal server error / Error interno del servidor",
        details: error.message,
        service: null,
      });
    }
  }
  async getByUserId(req, res) {
    try {
      const userId = req.params.id;
      const services = await Service.findAll({
        where: { creatorId: userId },
        include: {
          association: "creator",
          model: User,
        },
      });
      if (services.length === 0) {
        throw new ErrorController(404, "No se encontraron servicios para este usuario", { services: [] });
      }
      res.status(200).json({
        message: "Servicios recuperados con éxito para el usuario",
        services,
      });
    } catch (error) {
      if (error instanceof ErrorController) {
        return res.status(error.status).json({
          message: null,
          error: error.message,
          details: error.details || null,
          services: null,
        });
      }
      if (error.name === "SequelizeDatabaseError") {
        return res.status(500).json({
          message: "Error de base de datos",
          details: error.message,
        });
      }
      console.error(error);
      return res.status(500).json({
        message: "Error interno del servidor",
        details: error.message,
      });
    }
  }
}

module.exports = new ServiceController();
