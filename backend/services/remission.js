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
    const remission = await Remission.create(data);
    await createAuditLog({
      entity_type: 'Remission',
      entity_id: remission.id,
      action: 'CREATE',
      old_data: null,
      new_data: remission.toJSON(),
      changed_by: userId,
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
