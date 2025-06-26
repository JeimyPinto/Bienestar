const { Remission, Request, User, Service } = require('../models');
const { createAuditLog } = require('./auditLog');

class RemissionService {
  async createRemission(data, userId = null) {
    // Verifica que la solicitud esté aprobada antes de crear la remisión
    const request = await Request.findByPk(data.requestId);
    if (!request) {
      const error = new Error('Request not found');
      error.status = 404;
      throw error;
    }
    if (request.responseStatus !== 'aprobada') {
      const error = new Error('Request must be approved to create a remission');
      error.status = 400;
      throw error;
    }
    
    // Crear la remisión
    const remission = await Remission.create(data);
    
    // Actualizar el status de la request a inactiva
    await request.update({
      status: false, // inactiva
      responseStatus: 'aprobada' // mantener como aprobada
    });
    
    // Crear log de auditoría para la remisión
    await createAuditLog({
      entity_type: 'Remission',
      entity_id: remission.id,
      action: 'CREATE',
      old_data: null,
      new_data: remission.toJSON(),
      changed_by: userId,
    });
    
    // Crear log de auditoría para la actualización de la request
    await createAuditLog({
      entity_type: 'Request',
      entity_id: request.id,
      action: 'UPDATE',
      old_data: { status: true, responseStatus: request.responseStatus },
      new_data: { status: false, responseStatus: 'aprobada' },
      changed_by: userId,
      description: 'Request updated to inactive after remission creation'
    });
    
    return remission;
  }

  async getAllRemissions() {
    return await Remission.findAll({
      include: [
        { model: Request, as: 'request' },
        { model: User, as: 'referredUser' },
        { model: User, as: 'assignedUser' },
        { model: Service, as: 'service' },
      ],
    });
  }

  async getRemissionById(id) {
    return await Remission.findByPk(id, {
      include: [
        { model: Request, as: 'request' },
        { model: User, as: 'referredUser' },
        { model: User, as: 'assignedUser' },
        { model: Service, as: 'service' },
      ],
    });
  }

  async updateRemission(id, data, userId = null) {
    const remission = await Remission.findByPk(id);
    if (!remission) return null;
    const oldRemissionData = remission.get({ plain: true });
    await remission.update(data);
    await createAuditLog({
      entity_type: 'Remission',
      entity_id: remission.id,
      action: 'UPDATE',
      old_data: oldRemissionData,
      new_data: remission.toJSON(),
      changed_by: userId,
    });
    return remission;
  }
}

module.exports = new RemissionService();
