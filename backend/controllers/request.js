const requestService = require("../services/request.js");
const { requestSchema } = require("../schemas/request.js");

class RequestController {
    async getAll(req, res, next) {
        try {
            const requests = await requestService.getAllRequests();
            if (requests.length === 0) {
                const error = new Error("No se encontraron solicitudes");
                error.status = 404;
                error.details = { requests: [] };
                throw error;
            }
            res.status(200).json({
                message: "Solicitudes recuperadas con éxito",
                requests,
            });
        } catch (error) {
            next(error);
        }
    }

    async getAllActive(req, res, next) {
        try {
            const requests = await requestService.getAllActiveRequests();
            if (requests.length === 0) {
                const error = new Error("No se encontraron solicitudes activas");
                error.status = 404;
                error.details = { requests: [] };
                throw error;
            }
            res.status(200).json({
                message: "Solicitudes activas recuperadas con éxito",
                requests,
            });
        } catch (error) {
            next(error);
        }
    }

    async getById(req, res, next) {
        try {
            const request = await requestService.getRequestById(req.params.id);
            if (!request) {
                const error = new Error("Solicitud no encontrada");
                error.status = 404;
                error.details = { request: null };
                throw error;
            }
            res.status(200).json({
                message: "Solicitud recuperada con éxito",
                request,
            });
        } catch (error) {
            next(error);
        }
    }

    async create(req, res, next) {
        try {
            const requestData = requestSchema.parse(req.body);
            const request = await requestService.createRequest(requestData, req.user?.id || null);
            res.status(201).json({
                message: "Solicitud creada con éxito",
                request,
            });
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        try {
            const requestData = requestSchema.parse(req.body);
            const request = await requestService.updateRequest(req.params.id, requestData, req.user?.id || null);
            if (!request) {
                const error = new Error("Solicitud no encontrada");
                error.status = 404;
                error.details = { request: null };
                throw error;
            }
            res.status(200).json({
                message: "Solicitud actualizada con éxito",
                request,
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
            const requests = await requestService.getRequestsByUserId(userId);
            if (!requests || requests.length === 0) {
                const error = new Error("No se encontraron solicitudes para este usuario");
                error.status = 404;
                error.details = { requests: [] };
                throw error;
            }
            res.status(200).json({
                message: "Solicitudes de remsión del usuario recuperadas con éxito",
                requests,
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new RequestController();
