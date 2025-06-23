const { Remission, Request, User, Service } = require('../models');
const remissionSchema = require('../schemas/remission');
const { createAuditLog } = require('../services/auditLog');

const RemissionController = {
  async create(req, res) {
    try {
      const { error, value } = remissionSchema.validate(req.body);
      if (error) return res.status(400).json({ error: error.details[0].message });

      // Verifica que la solicitud esté aprobada antes de crear la remisión
      const request = await Request.findByPk(value.requestId);
      if (!request) return res.status(404).json({ error: 'Request not found' });
      if (request.responseStatus !== 'aprobada') {
        return res.status(400).json({ error: 'Request must be approved to create a remission' });
      }

      const remission = await Remission.create(value);
      // Auditoría de creación
      await createAuditLog({
        entity_type: 'Remission',
        entity_id: remission.id,
        action: 'CREATE',
        old_data: null,
        new_data: remission.toJSON(),
        changed_by: req.user?.id || null,
      });
      return res.status(201).json({ remission });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  async getAll(req, res) {
    try {
      const remissions = await Remission.findAll({
        include: [
          { model: Request, as: 'request' },
          { model: User, as: 'referredUser' },
          { model: User, as: 'assignedUser' },
          { model: Service, as: 'service' },
        ],
      });
      return res.json({ remissions });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const remission = await Remission.findByPk(id, {
        include: [
          { model: Request, as: 'request' },
          { model: User, as: 'referredUser' },
          { model: User, as: 'assignedUser' },
          { model: Service, as: 'service' },
        ],
      });
      if (!remission) return res.status(404).json({ error: 'Remission not found' });
      return res.json({ remission });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { error, value } = remissionSchema.validate(req.body);
      if (error) return res.status(400).json({ error: error.details[0].message });
      const remission = await Remission.findByPk(id);
      if (!remission) return res.status(404).json({ error: 'Remission not found' });
      const oldRemissionData = remission.get({ plain: true });
      await remission.update(value);
      // Auditoría de actualización
      await createAuditLog({
        entity_type: 'Remission',
        entity_id: remission.id,
        action: 'UPDATE',
        old_data: oldRemissionData,
        new_data: remission.toJSON(),
        changed_by: req.user?.id || null,
      });
      return res.json({ remission });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },
};

module.exports = RemissionController;
