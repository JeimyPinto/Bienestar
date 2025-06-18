const db = require("../models/index.js");
const Service = db.Service;
const User = db.User;

class ServiceController {
  async getAll(req, res, next) {
    try {
      const services = await Service.findAll({
        include: {
          association: "creator",
          model: User,
        },
      });
      if (services.length === 0) {
        const error = new Error("No services found / No se encontraron servicios");
        error.status = 404;
        error.details = { services: null };
        throw error;
      }
      res.status(200).json({
        message: "Services retrieved successfully / Servicios recuperados con éxito",
        services,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllActive(req, res, next) {
    try {
      const services = await Service.findAll({
        where: { status: "activo" },
        include: {
          association: "creator",
          model: User,
        },
      });
      if (services.length === 0) {
        const error = new Error("No se encontraron servicios activos");
        error.status = 404;
        error.details = { services: [] };
        throw error;
      }
      res.status(200).json({
        message: "Active services retrieved successfully / Servicios activos recuperados con éxito",
        services,
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const service = await Service.findByPk(req.params.id, {
        include: {
          association: "creator",
          model: User,
        },
      });
      if (!service) {
        const error = new Error("Service not found / Servicio no encontrado");
        error.status = 404;
        error.details = { service: null };
        throw error;
      }
      res.status(200).json({
        message: "Service retrieved successfully / Servicio recuperado con éxito",
        service,
      });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
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
        service,
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const serviceId = req.params.id;
      const service = await Service.findByPk(serviceId);
      if (!service) {
        const error = new Error("Servicio no encontrado");
        error.status = 404;
        error.details = { service: null };
        throw error;
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
        message: "Servicio actualizado con éxito",
        service: { ...service.toJSON(), ...updatedFields },
      });
    } catch (error) {
      next(error);
    }
  }

  async getByUserId(req, res, next) {
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
