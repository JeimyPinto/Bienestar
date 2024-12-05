const db = require("../models/index.js");
const Servicio = db.Servicio;
const Integrante = db.Integrante;
const { ValidationError, DatabaseError } = require("sequelize");
const servicioSchema = require("../schemas/servicio.js");

class ServicioController {
    /**
     * Función para obtener todos los servicios
     * @param {*} req
     * @param {*} res Status 200: Retorna un json con todos los servicios
     * @version 22/11/2024
     * @autor Jeimy Pinto
     */
    async getAll(req, res) {
        try {
            const servicios = await Servicio.findAll({
              include: {
                model: Integrante,
                attributes: ['area'],
              },
            });
            res.status(200).json(servicios);
          } catch (error) {
            if (error instanceof ValidationError) {
                res
                    .status(400)
                    .json({ message: "Error de validación", errors: error.errors });
            } else if (error instanceof DatabaseError) {
                res
                    .status(500)
                    .json({ message: "Error de base de datos", error: error.message });
            } else  {
                res.status(500).json({
                    message: "Error al obtener los servicios",
                    error: error.message,
                });
            }
        }
    }

    /**
     * Función para crear un servicio
     * @param {*} req.body.nombre Nombre del servicio
     * @param {*} req.body.encargadoId ID del encargado del servicio
     * @param {*} res Status 201: Retorna un json con el servicio creado
     * @version 22/11/2024
     * @autor Jeimy Pinto
     */
    async create(req, res) {
        let parsedData;
        // Parsear los datos del body y los valida con el schema.
        // Si hay un error de validación, se envía un mensaje de error.
        try {
            parsedData = await servicioSchema.parseAsync(req.body);
        } catch (validationError) {
            console.error("Error de validación:", validationError);
            return res.status(400).json({
                message: "Error de validación",
                errors: validationError.errors,
            });
        }
        try {
            const newServicio = await Servicio.create({
                ...parsedData,
                imagen: req.file ? `/images/${newServicio.id}/${req.file.filename}` : null, // Guardar la ruta de la imagen
            });
            res
                .status(201)
                .json({ message: "Servicio creado correctamente", servicio: newServicio });
        } catch (error) {
            if (error instanceof ValidationError) {
                res
                    .status(400)
                    .json({ message: "Error de validación", errors: error.errors });
            } else if (error instanceof DatabaseError) {
                res
                    .status(500)
                    .json({ message: "Error de base de datos", error: error.message });
            } else {
                res.status(500).json({
                    message: "Error al crear el servicio",
                    error: error.message,
                });
            }
        }
    }
    /**
     * Función para actualizar un servicio
     * @param {*} req los datos a actualizar
     * @param {*} res Status 200: Retorna un json con el servicio actualizado
     * @version 22/11/2024
     * @autor Jeimy Pinto
     */
    async update(req, res) {
        const { id } = req.params;
        try {
            const servicio = await Servicio.findByPk(id);
            if (!servicio) {
                return res.status(404).json({ message: "Servicio no encontrado" });
            }
            let parsedData;
            try {
                parsedData = await servicioSchema.parseAsync(req.body);
            } catch (validationError) {
                console.error("Error de validación:", validationError);
                return res.status(400).json({
                    message: "Error de validación",
                    errors: validationError.errors,
                });
            }
            const { nombre, encargadoId, imagen } = parsedData;
            await servicio.update({
                nombre,
                encargadoId,
                imagen: req.file ? `/images/${id}/${req.file.filename}` : imagen, // Actualizar la ruta de la imagen
            });
            res
                .status(200)
                .json({ message: "Servicio actualizado correctamente", servicio });
        } catch (error) {
            if (error instanceof ValidationError) {
                res
                    .status(400)
                    .json({ message: "Error de validación", errors: error.errors });
            } else if (error instanceof DatabaseError) {
                res
                    .status(500)
                    .json({ message: "Error de base de datos", error: error.message });
            } else {
                res.status(500).json({
                    message: "Error al actualizar el servicio",
                    error: error.message,
                });
            }
        }
    }
}

module.exports = new ServicioController();
