const db = require("../models/index.js");
const Service = db.Service;
const User = db.User;
const Request = db.Request;
const { requestSchema } = require("../schemas/request.js");
const { DatabaseError, ValidationError } = require("sequelize");
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
                return res.status(404).send({
                    message: null,
                    error: "No requests found / No se encontraron solicitudes",
                    requests: [],
                });
            }
            res.status(200).send({
                message: "Requests retrieved successfully / Solicitudes recuperadas con éxito",
                error: null,
                requests,
            });
        } catch (error) {
            if (error.errors) {
                res.status(400).send({
                    message: null,
                    error: "Validation Error / Error de Validación ( " + error.message + " )",
                    requests: [],
                });
            } else if (error instanceof DatabaseError) {
                res.status(500).send({
                    message: null,
                    error: "Database Error / Error de Base de Datos ( " + error.message + " )",
                    requests: [],
                });
            } else {
                res.status(500).send({
                    message: null,
                    error: "Error retrieving requests / Error al recuperar solicitudes ( " + error.message + " )",
                    requests: [],
                });
            }
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
                return res.status(404).send({
                    message: null,
                    error: "No active requests found / No se encontraron solicitudes activas",
                    requests: [],

                });
            }
            res.status(200).send({
                message: "Active requests retrieved successfully / Solicitudes activas recuperadas con éxito",
                error: null,
                requests,
            });
        } catch (error) {
            if (error instanceof ValidationError) {
                res.status(400).send({
                    message: null,
                    error: "Validation Error / Error de Validación ( " + error.message + " )",
                    requests: [],
                });
            } else if (error instanceof DatabaseError) {
                res.status(500).send({
                    message: "Database Error / Error de Base de Datos",
                    error: error.message,
                    requests: [],
                });
            } else {
                res.status(500).send({
                    message: null,
                    error: "Error retrieving active requests / Error al recuperar solicitudes activas",
                    requests: [],
                });
            }
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
                return res.status(404).send({
                    message: null,
                    error: "Request not found / Solicitud no encontrada ( " + req.params.id + " )",
                    request: null,
                });
            }
            res.status(200).send({
                message: "Request retrieved successfully / Solicitud recuperada con éxito",
                error: null,
                request,
            });
        } catch (error) {
            res.status(500).send({
                message: null,
                error: "Error retrieving request / Error al recuperar solicitud ( " + error.message + " )",
                request: null,
            });
        }
    }

    async create(req, res) {
        try {
            const requestData = requestSchema.parse(req.body)
            const request = await Request.create(requestData)
            res.status(201).send({
                message: "Request created successfully / Solicitud creada con éxito",
                error: null,
                request,
            });
        } catch (error) {
            if (error.errors) {
                res.status(400).send({
                    message: null,
                    error: "Validation Error / Error de Validación ( " + error.message + " )",
                    request: null,
                });
            }
            else {
                res.status(500).send({
                    message: null,
                    error: "Error creating request / Error al crear solicitud ( " + error.message + " )",
                    request: null,
                });
            }
        }
    }

    async update(req, res) {
        try {
            const requestData = requestSchema.parse(req.body);
            const request = await Request.findByPk(req.params.id);
            if (request) {
                await request.update(requestData);
                res.status(200).send({
                    message: "Request updated successfully / Solicitud actualizada con éxito",
                    error: null,
                    request,
                });
            } else {
                res.status(404).send({
                    message: null,
                    error: "Request not found / Solicitud no encontrada ( " + req.params.id + " )",
                    request
                });
            }
        } catch (error) {
            if (error.errors) {
                res.status(400).send({
                    message: null,
                    error: "Validation Error / Error de Validación ( " + error.message + " )",
                    request: null,
                });
            }
            else {
                res.status(500).send({
                    message: null,
                    error: "Error updating request / Error al actualizar solicitud ( " + error.message + " )",
                    request: null,
                });
            }
        }
    }
}

module.exports = new RequestController();
