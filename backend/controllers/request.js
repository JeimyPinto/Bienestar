const db = require("../models/index.js");
const Service = db.Service;
const User = db.User;
const Request = db.Request;
const { requestSchema } = require("../schemas/request.js");
const { enabledRoles } = require("../utils/enabledRoles.js");

class ServiceController {
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
                    message: "No requests found / No se encontraron solicitudes",
                });
            }
            res.status(200).send({
                message: "Requests retrieved successfully / Solicitudes recuperadas con éxito",
                requests,
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
                    message: "Error retrieving requests / Error al recuperar solicitudes",
                });
            }
        }
    }

    //Obitener todos las solicitudes activas
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
                    message: "No active requests found / No se encontraron solicitudes activas",
                });
            }
            res.status(200).send({
                message: "Active requests retrieved successfully / Solicitudes activas recuperadas con éxito",
                requests,
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
                    message: "Error retrieving active requests / Error al recuperar solicitudes activas",
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
                    message: "Request not found / Solicitud no encontrada",
                });
            }
            res.status(200).send({
                message: "Request retrieved successfully / Solicitud recuperada con éxito",
                request,
            });
        } catch (error) {
            res.status(500).send({
                message: "Error retrieving request / Error al recuperar solicitud",
            });
        }
    }

    async create(req, res) {
        try {
            // Verifica si el usuario autenticado tiene el rol adecuado
            if (!enabledRoles.includes(req.user.role)) {
                return res.status(403).json({
                    message: "No autorizado / Not authorized",
                    role: req.user.role,
                });
            }
            const requestData = serviceSchema.parse(req.body);
            const request = await Request.create({
                creatorId: requestData.creatorId,
                serviceId: requestData.serviceId,
                status: requestData.status,
                description: requestData.description,
            });
            res.status(201).send({
                message: "Request created successfully / Solicitud creada con éxito",
                request,
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
                    message: "Error creating request / Error al crear solicitud",
                    errors: error.message,
                });
            }
        }
    }

    async update(req, res) {
        try {
            const requestData = requestSchema.parse(req.body);
            const request = await request.findByPk(req.params.id);
            if (request) {
                await request.update(requestData);
                res.status(200).send({
                    message: "Request updated successfully / Solicitud actualizada con éxito",
                    request,
                });
            } else {
                res.status(404).send({
                    message: "Request not found / Solicitud no encontrada",
                    request
                });
            }
        } catch (error) {
            if (error.errors) {
                res.status(400).send({
                    message: "Validation Error / Error de Validación",
                    errors: error.errors,
                });
            }
            else {
                res.status(500).send({
                    message: "Error updating request / Error al actualizar solicitud",
                    errors: error.message,
                });
            }
        }
    }

    async delete(req, res) {
        try {
            const request = await Request.findByPk(req.params.id);
            if (request) {
                await request.update({ status: false });
                res.status(200).send({
                    message: "Request set to close successfully / Solicitud pasada a cerrada con éxito",
                    request,
                });
            } else {
                res
                    .status(404)
                    .send({ message: "Request not found / Solicitud no encontrada" });
            }
        } catch (error) {
            if (error instanceof DatabaseError) {
                res.status(500).send({
                    message: "Database Error / Error de Base de Datos",
                    errors: error.message,
                });
            } else {
                res.status(500).send({
                    message: "Error closing request / Error al cerrar solicitud",
                    errors: error.message,
                });
            }
        }
    }
}

module.exports = new ServiceController();
