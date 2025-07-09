const db = require("../models/index.js");
const Service = db.Service;
const User = db.User;
const Request = db.Request;
const auditLogService = require("./auditLog.js");

class RequestService {
  async getAllRequests() {
    return await Request.findAll({
      include: [
        { association: "applicant", model: User, required: false },
        { association: "service", model: Service, required: false },
        { association: "creator", model: User, required: false },
      ],
    });
  }

  async getAllActiveRequests() {
    return await Request.findAll({
      where: { status: true },
      include: [
        { association: "applicant", model: User },
        { association: "service", model: Service },
      ],
    });
  }

  async getRequestById(id) {
    return await Request.findByPk(id, {
      include: [
        { association: "applicant", model: User },
        { association: "service", model: Service },
      ],
    });
  }

  async createRequest(requestData, userId = null) {
    const request = await Request.create(requestData);
    await auditLogService.createAuditLog({
      entity_type: "Request",
      entity_id: request.id,
      action: "CREATE",
      old_data: null,
      new_data: request.toJSON(),
      changed_by: userId,
    });

    // Enviar notificación por correo al creador del servicio
    const { sendRequestNotification } = require("./mail");
    // Obtener el servicio y su creador
    const service = await db.Service.findByPk(request.serviceId, {
      include: [{ model: db.User, as: "creator" }]
    });
    if (service && service.creator && service.creator.email) {
      // Obtener datos del solicitante
      const applicant = await db.User.findByPk(request.userId, {
        attributes: ["firstName", "lastName", "email", "documentNumber"]
      });
      if (applicant) {
        await sendRequestNotification({
          serviceCreator: service.creator,
          applicant,
          request,
          service
        });
      }
    }
    return request;
  }

  async updateRequest(id, requestData, userId = null) {
    const request = await Request.findByPk(id);
    if (!request) return null;
    const oldData = request.get({ plain: true });
    await request.update(requestData);
    await auditLogService.createAuditLog({
      entity_type: "Request",
      entity_id: request.id,
      action: "UPDATE",
      old_data: oldData,
      new_data: request.toJSON(),
      changed_by: userId,
    });
    return request;
  }

  async getRequestsByUserId(userId) {
    return await Request.findAll({
      where: { userId },
      include: [
        { association: "applicant", model: User },
        { association: "service", model: Service },
      ],
    });
  }
}

module.exports = new RequestService();
