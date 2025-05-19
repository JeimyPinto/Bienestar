const db = require("../models/index.js");
const Service = db.Service;
const User = db.User;
const { ValidationError, DatabaseError } = require("sequelize");
const { serviceCreateSchema } = require("../schemas/service.js");

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
        return res.status(404).send({
          message: "No services found / No se encontraron servicios",
        });
      }
      res.status(200).send({
        message: "Services retrieved successfully / Servicios recuperados con éxito",
        services,
      });
    } catch (error) {
      if (error.errors) {
        res.status(400).send({
          message: "Validation Error / Error de Validación",
          errors: error.message,
        });
      } else if (error instanceof DatabaseError) {
        res.status(500).send({
          message: "Database Error / Error de Base de Datos",
          errors: error.message,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving services / Error al recuperar servicios",
        });
      }
    }
  }

  //Obitener todos los servicios activos
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
        return res.status(404).send({
          message: "No se encontraron servicios activos / No active services found",
        });
      }
      res.status(200).send({
        message: "Active services retrieved successfully / Servicios activos recuperados con éxito",
        services,
      });
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(400).send({
          message: "Validation Error / Error de Validación",
          errors: error.message,
        });
      } else if (error instanceof DatabaseError) {
        res.status(500).send({
          message: "Database Error / Error de Base de Datos",
          errors: error.message,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving active services / Error al recuperar servicios activos",
        });
      }
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
        return res.status(404).send({
          message: "Service not found / Servicio no encontrado",
        });
      }
      res.status(200).send({
        message: "Service retrieved successfully / Servicio recuperado con éxito",
        service,
      });
    } catch (error) {
      res.status(500).send({
        message: "Error retrieving service / Error al recuperar servicio",
      });
    }
  }

  async create(req, res) {
    try {
      // Verifica si el usuario autenticad o tiene el rol adecuado
      if (!enabledRoles.includes(req.user.role)) {
        return res.status(403).json({
          message: "No autorizado / Not authorized",
          role: req.user.role,
        });
      }
      const serviceData = serviceCreateSchema.parse(req.body);
      const service = await Service.create({
        ...serviceData,
        creatorId: req.user.id,
      });
      res.status(201).send({
        message: "Service created successfully / Servicio creado con éxito",
        service,
      });
    } catch (error) {
      if (error.errors) {
        res.status(400).send({
          message: "Validation Error / Error de Validación",
          errors: error.errors,
        });
      }
      else {
        res.status(500).send({
          message: "Error creating service / Error al crear servicio",
          errors: error.message,
        });
      }
    }
  }

  /**
   * Actualizar un servicio
   * @param {*} req - La solicitud HTTP
   * @param {*} res - La respuesta HTTP
   * @returns {Promise<void>}
   * @version 18/03/2025
   * @autor Jeimy Pinto
   */
  async updateService(req, res) {
    try {
      const serviceData = serviceCreateSchema.parse(req.body);
      const service = await Service.findByPk(req.params.id);
      if (service) {
        await service.update(serviceData);
        res.status(200).send(service);
      } else {
        res
          .status(404)
          .send({ message: "Service not found / Servicio no encontrado" });
      }
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(400).send({
          message: "Validation Error / Error de Validación",
          errors: error.message,
        });
      } else if (error instanceof DatabaseError) {
        res.status(500).send({
          message: "Database Error / Error de Base de Datos",
          errors: error.message,
        });
      } else {
        res.status(500).send({
          message: "Error updating service / Error al actualizar servicio",
        });
      }
    }
  }

  /**
   * Eliminar un servicio
   * @param {*} req - La solicitud HTTP
   * @param {*} res - La respuesta HTTP
   * @returns {Promise<void>}
   * @version 18/03/2025
   * @autor Jeimy Pinto
   */
  async deleteService(req, res) {
    try {
      const service = await Service.findByPk(req.params.id);
      if (service) {
        await service.destroy();
        res.status(204).send();
      } else {
        res
          .status(404)
          .send({ message: "Service not found / Servicio no encontrado" });
      }
    } catch (error) {
      if (error instanceof DatabaseError) {
        res.status(500).send({
          message: "Database Error / Error de Base de Datos",
          errors: error.message,
        });
      } else {
        res.status(500).send({
          message: "Error deleting service / Error al eliminar servicio",
        });
      }
    }
  }
}

module.exports = new ServiceController();
