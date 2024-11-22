const db = require("../models/index.js");
const Servicio = db.Servicio;
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
            console.log("Obteniendo servicios");
            const servicios = await Servicio.findAll();
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
            } else {
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
            return res.status(400).json({ message: "Error de validación", errors: validationError.errors });
        }
        const { nombre, encargadoId } = parsedData;
        try {
            const servicio = await Servicio.create({
                nombre,
                encargadoId,
            });
            res.status(201).json({ message: "Servicio creado correctamente", servicio });
        } catch (error) {
            if (error instanceof ValidationError) {
                res.status(400).json({ message: "Error de validación", errors: error.errors });
            } else if (error instanceof DatabaseError) {
                res.status(500).json({ message: "Error de base de datos", error: error.message });
            } else {
                res.status(500).json({ message: "Error al crear el servicio", error: error.message });
            }
        }
    }
}

module.exports = new ServicioController();
