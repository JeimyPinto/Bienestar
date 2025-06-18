const db = require("../models/index.js");
const Service = db.Service;
const User = db.User;
const Request = db.Request;

class RequestController {
    async getAll(req, res, next) {
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
                const error = new Error("No se encontraron solicitudes");
                error.status = 404;
                error.details = { requests: [] };
                throw error;
            }
            res.status(200).json({
                message: "Solicitudes recuperadas con éxito",
                details: { requests },
            });
        } catch (error) {
            next(error);
        }
    }

    async getAllActive(req, res, next) {
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
                const error = new Error("No se encontraron solicitudes activas");
                error.status = 404;
                error.details = { requests: [] };
                throw error;
            }
            res.status(200).json({
                message: "Solicitudes activas recuperadas con éxito",
                details: { requests },
            });
        } catch (error) {
            next(error);
        }
    }

    async getById(req, res, next) {
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
                const error = new Error("Solicitud no encontrada");
                error.status = 404;
                error.details = { request: null };
                throw error;
            }
            res.status(200).json({
                message: "Solicitud recuperada con éxito",
                details: { request },
            });
        } catch (error) {
            next(error);
        }
    }

    async create(req, res, next) {
        try {
            const requestData = requestSchema.parse(req.body);
            const request = await Request.create(requestData);
            res.status(201).json({
                message: "Solicitud creada con éxito",
                details: { request },
            });
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        try {
            const requestData = requestSchema.parse(req.body);
            const request = await Request.findByPk(req.params.id);
            if (!request) {
                const error = new Error("Solicitud no encontrada");
                error.status = 404;
                error.details = { request: null };
                throw error;
            }
            await request.update(requestData);
            res.status(200).json({
                message: "Solicitud actualizada con éxito",
                details: { request },
            });
        } catch (error) {
            next(error);
        }
    }

    async getByUserId(req, res, next) {
        try {
            const userId = req.params.id;
            if (!userId) {
                const error = new Error("ID de usuario es requerido");
                error.status = 400;
                error.details = { userId: null };
                throw error;
            }
            const requests = await Request.findAll(
                {
                    where: { userId },
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
            if (!requests || requests.length === 0) {
                const error = new Error("No se encontraron solicitudes para este usuario");
                error.status = 404;
                error.details = { requests: [] };
                throw error;
            }
            res.status(200).json({
                message: "Solicitudes de remsión del usuario recuperadas con éxito",
                requests: requests,
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new RequestController();
