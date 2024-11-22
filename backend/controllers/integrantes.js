const db = require("../models/index.js");
const Integrante = db.Integrante;
const integranteSchema = require("../schemas/integrante.js");

class IntegranteController {
    /**
     * Función para obtener todos los integrantes
     * @param {*} req 
     * @param {*} res Todos los integrantes en formato JSON
     * @returns Lista de integrantes
     * @throws Error en el servidor
     * @version 22/11/2024
     * @author Jeimy Pinto
     */
    async getAll(req, res) {
        try {
            const integrantes = await Integrante.findAll();
            res.status(200).send(integrantes);
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    }

    async create(req, res) {
        let parsedData;
        try {
            parsedData = await integranteSchema.parseAsync(req.body);
        } catch (validationError) {
            console.error("Error de validación:", validationError);
            return res.status(400).json({ message: "Error de validación", errors: validationError.errors });
        }

        const { usuarioId, area } = parsedData;

        try {
            const integrante = await Integrante.findOne({ where: { usuarioId } });
            if (integrante) {
                return res.status(400).json({ message: "Ya existe un integrante con ese usuarioId" });
            }

            const nuevoIntegrante = await Integrante.create({
                usuarioId,
                area
            });

            res.json({ message: "Integrante registrado correctamente" });
        } catch (error) {
            console.error("Error durante el registro:", error);
            if (error.name === "SequelizeValidationError") {
                res.status(400).json({ message: "Error de validación", errors: error.errors });
            } else if (error.name === "SequelizeDatabaseError") {
                res.status(500).json({ message: "Error de base de datos", error: error.message });
            } else {
                res.status(500).json({ message: "Error al registrar el integrante", error: error.message });
            }
        }
    }
}

module.exports = new IntegranteController();