const db = require("../models/index.js");
const Service = db.Service;
const User = db.User;
const Request = db.Request;
const { requestSchema } = require("../schemas/request.js");
const ErrorController = require("../controllers/error.js");

class RequestController {
    async getAll(req, res) {
        try {
            const requests = await Request.findAll({
                include: [
                    {
                        association: "applicant",
                        model: User,
                    },
                    {
                        association: "service",
                        model: Service,
                    }
                ],
            });
            if (requests.length === 0) {
                throw new ErrorController(404, "No se encontraron solicitudes", { requests: [] });
            }
            res.status(200).json({
                message: "Solicitudes recuperadas con éxito",
                details: { requests },
            });
        } catch (error) {
            if (error instanceof ErrorController) {
                return res.status(error.status).json({
                    message: error.message,
                    details: error.details || null,
                });
            }
            if (error.errors) {
                return res.status(400).json({
                    message: "Error de Validación",
                    details: error.errors,
                });
            }
            if (error.name === "SequelizeDatabaseError") {
                return res.status(500).json({
                    message: "Error de Base de Datos",
                    details: error.message,
                });
            }
            console.error(error);
            res.status(500).json({
                message: "Error interno del servidor",
                details: error.message,
            });
        }
    }

    async getAllActive(req, res) {
        try {
            const requests = await Request.findAll({
                where: { status: "activo" },
                include: [
                    {
                        association: "applicant",
                        model: User,
                    },
                    {
                        association: "service",
                        model: Service,
                    }
                ],
            });
            if (requests.length === 0) {
                throw new ErrorController(404, "No se encontraron solicitudes activas", { requests: [] });
            }
            res.status(200).json({
                message: "Solicitudes activas recuperadas con éxito",
                details: { requests },
            });
        } catch (error) {
            if (error instanceof ErrorController) {
                return res.status(error.status).json({
                    message: error.message,
                    details: error.details || null,
                });
            }
            if (error.errors) {
                return res.status(400).json({
                    message: "Error de Validación",
                    details: error.errors,
                });
            }
            if (error.name === "SequelizeDatabaseError") {
                return res.status(500).json({
                    message: "Error de Base de Datos",
                    details: error.message,
                });
            }
            console.error(error);
            res.status(500).json({
                message: "Error interno del servidor",
                details: error.message,
            });
        }
    }

    async getById(req, res) {
        try {
            const request = await Request.findByPk(req.params.id, {
                include: [
                    {
                        association: "applicant",
                        model: User,
                    },
                    {
                        association: "service",
                        model: Service,
                    }
                ],
            });
            if (!request) {
                throw new ErrorController(404, "Solicitud no encontrada", { request: null });
            }
            res.status(200).json({
                message: "Solicitud recuperada con éxito",
                details: { request },
            });
        } catch (error) {
            if (error instanceof ErrorController) {
                return res.status(error.status).json({
                    message: error.message,
                    details: error.details || null,
                });
            }
            if (error.errors) {
                return res.status(400).json({
                    message: "Error de Validación",
                    details: error.errors,
                });
            }
            if (error.name === "SequelizeDatabaseError") {
                return res.status(500).json({
                    message: "Error de Base de Datos",
                    details: error.message,
                });
            }
            console.error(error);
            res.status(500).json({
                message: "Error interno del servidor",
                details: error.message,
            });
        }
    }

    async create(req, res) {
        try {
            const requestData = requestSchema.parse(req.body);
            const request = await Request.create(requestData);
            res.status(201).json({
                message: "Solicitud creada con éxito",
                details: { request },
            });
        } catch (error) {
            if (error.errors) {
                return res.status(400).json({
                    message: "Error de Validación",
                    details: error.errors,
                });
            }
            if (error instanceof ErrorController) {
                return res.status(error.status).json({
                    message: error.message,
                    details: error.details || null,
                });
            }
            if (error.name === "SequelizeDatabaseError") {
                return res.status(500).json({
                    message: "Error de Base de Datos",
                    details: error.message,
                });
            }
            console.error(error);
            res.status(500).json({
                message: "Error interno del servidor",
                details: error.message,
            });
        }
    }

    async update(req, res) {
        try {
            const requestData = requestSchema.parse(req.body);
            const request = await Request.findByPk(req.params.id);
            if (!request) {
                throw new ErrorController(404, "Solicitud no encontrada", { request: null });
            }
            await request.update(requestData);
            res.status(200).json({
                message: "Solicitud actualizada con éxito",
                details: { request },
            });
        } catch (error) {
            if (error.errors) {
                return res.status(400).json({
                    message: "Error de Validación",
                    details: error.errors,
                });
            }
            if (error instanceof ErrorController) {
                return res.status(error.status).json({
                    message: error.message,
                    details: error.details || null,
                });
            }
            if (error.name === "SequelizeDatabaseError") {
                return res.status(500).json({
                    message: "Error de Base de Datos",
                    details: error.message,
                });
            }
            console.error(error);
            res.status(500).json({
                message: "Error interno del servidor",
                details: error.message,
            });
        }
    }
}

module.exports = new RequestController();
