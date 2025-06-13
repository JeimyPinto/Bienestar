const db = require("../models/index.js");
const Service = db.Service;
const User = db.User;
const { ValidationError, DatabaseError } = require("sequelize");
const { serviceSchema } = require("../schemas/service.js");
const { enabledRoles } = require("../constants/roles.js");

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
          message: null,
          error: "No services found / No se encontraron servicios",
          services: null,
        });
      }
      res.status(200).send({
        message: "Services retrieved successfully / Servicios recuperados con éxito",
        error: null,
        services,
      });
    } catch (error) {
      if (error.errors) {
        res.status(400).send({
          message: null,
          error: "Validation Error / Error de Validación: " + error.message,
          services: null,
        });
      } else if (error instanceof DatabaseError) {
        res.status(500).send({
          message: null,
          error: "Database Error / Error de Base de Datos: " + error.message,
          services: null,
        });
      } else {
        res.status(500).send({
          message: null,
          error: "Error retrieving services / Error al recuperar servicios " + error.message,
          services: null,
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
          message: null,
          error: "No se encontraron servicios activos / No active services found",
          services: null,
        });
      }
      res.status(200).send({
        message: "Active services retrieved successfully / Servicios activos recuperados con éxito",
        error: null,
        services,
      });
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(400).send({
          message: null,
          error: "Validation Error / Error de Validación" + error.message,
          services: null,
        });
      } else if (error instanceof DatabaseError) {
        res.status(500).send({
          message: null,
          error: "Database Error / Error de Base de Datos" + error.message,
          services: null,
        });
      } else {
        res.status(500).send({
          message: null,
          error: "Error retrieving active services / Error al recuperar servicios activos",
          services: null,
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
          message:null,
          error: "Service not found / Servicio no encontrado",
          service: null,
        });
      }
      res.status(200).send({
        message: "Service retrieved successfully / Servicio recuperado con éxito",
        error: null,
        service,
      });
    } catch (error) {
      res.status(500).send({
        message: null,
        error: "Error retrieving service / Error al recuperar servicio (" + error.message + ")",
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
        //Normalizar la ruta que funcione en Windows y Linux
        const fullPath = req.file.path.replace(/\\/g, "/");
        const uploadIndex = fullPath.indexOf("uploads");

        if (uploadIndex !== -1) {
          service.image = fullPath.substring(uploadIndex);
        } else {
          service.image = req.file.filename;
        }

        await service.update({ image: service.image });
      }
      res.status(201).send({
        message: "Service created successfully / Servicio creado con éxito",
        errors: null,
        service,
      });
    } catch (error) {
      // Errores de validación de Zod
      if (error.errors) {
        return res.status(400).json({
          message: null,
          error: "Validation Error / Error de Validación ( " + error.message + " )",
          service: null,
        });
      }
      // Otros errores
      res.status(500).json({
        message: null,
        error:
          "Error al crear el usuario / Error creating user (" +
          error.message +
          ")",
        service: null,
      });
    }
  }

  async update(req, res) {
    try {
      const serviceId = req.params.id;
      const service = await Service.findByPk(serviceId);
      if (!service) {
        return res.status(404).send({
          message: null,
          error: "Service not found / Servicio no encontrado",
          service: null,
        });
      }

      if (req.body.creatorId) {
        req.body.creatorId = Number(req.body.creatorId);
      }

      const serviceData = await serviceSchema.parseAsync(req.body);
      let updatedFields = { ...serviceData };


      if (req.file) {
        const fullPath = req.file.path.replace(/\\/g, "/");
        const uploadIndex = fullPath.indexOf("uploads");
        const imagePath = uploadIndex !== -1 ? fullPath.substring(uploadIndex) : req.file.filename;
        await service.update({ image: imagePath });
        updatedFields.image = imagePath;
      }
      await service.update(updatedFields);

      res.status(200).send({
        message: "Service updated successfully / Servicio actualizado con éxito",
        error: null,
        service: { ...service.toJSON(), ...updatedFields },
      });
    } catch (error) {
      if (error.errors) {
        res.status(400).json({
          message: "Error de validación / Validation error",
          error: error.errors,
          service: null,
        });
      } else {
        res.status(500).json({
          message: "Error al actualizar el usuario / Error updating user",
          error: error.message,
          service: null,
        });
      }
    }
  }
}

module.exports = new ServiceController();
