const db = require("../models/index.js");
const Service = db.Service;
const User = db.User;
const { ValidationError, DatabaseError } = require("sequelize");
const { serviceCreateSchema } = require("../schemas/service.js");

class ServiceController {
  /**
   * Obtener todos los servicios disponibles
   * @param {*} req - La solicitud HTTP
   * @param {*} res - La respuesta HTTP
   * @returns {Promise<void>}
   * @version 18/03/2025
   * @autor Jeimy Pinto
   */
  async getAllServices(req, res) {
    try {
      const services = await Service.findAll({
        include: {
          model: User,
          as: "creator",
          attributes: ["firstName", "lastName"],
        },
      });
      res.status(200).send(services);
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
          message: "Error retrieving services / Error al recuperar servicios",
        });
      }
    }
  }


  /**
   * Obtener un servicio por su ID
   * @param {*} req - La solicitud HTTP
   * @param {*} res - La respuesta HTTP
   * @returns {Promise<void>}
   * @version 18/03/2025
   * @autor Jeimy Pinto
   */
  async getServiceById(req, res) {
    try {
      const service = await Service.findByPk(req.params.id, {
        include: {
          model: User,
          as: "creator",
          attributes: ["firstName", "lastName"],
        },
      });
      if (service) {
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
          message: "Error retrieving service / Error al recuperar servicio",
        });
      }
    }
  }

  /**
   * Crear un servicio
   * @param {*} req - La solicitud HTTP
   * @param {*} res - La respuesta HTTP
   * @returns {Promise<void>}
   * @version 18/03/2025
   * @autor Jeimy Pinto
   */
  async createService(req, res) {
    try {
      let serviceData;
      try {
        serviceData = await serviceCreateSchema.parse(req.body);
      } catch (validationError) {
        console.error("Validation error:", validationError);
        return res.status(400).send({
          message: "Validation Error / Error de Validación",
          errors: validationError.errors,
        });
      }
      const service = await Service.create(serviceData);
      res.status(201).send(service);
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(400).send({
          message: "Validation Error / Error de Validación",
          errors: error.errors,
        });
      } else if (error instanceof DatabaseError) {
        res.status(500).send({
          message: "Database Error / Error de Base de Datos",
          errors: error.message,
        });
      } else {
        res.status(500).send({
          message: "Error creating service / Error al crear servicio",
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
