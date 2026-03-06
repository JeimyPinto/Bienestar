const db = require("../models/index.js");

async function getAuditLogs({ 
  entity_type, 
  entity_id, 
  action, 
  changed_by, 
  limit = 50, 
  offset = 0,
  orderBy = "changed_at",
  orderDir = "DESC"
}) {
  const where = {};
  if (entity_type) where.entity_type = entity_type;
  if (entity_id) where.entity_id = entity_id;
  if (action) where.action = action;
  if (changed_by) where.changed_by = changed_by;
  
  return db.audit_log.findAll({
    where,
    include: [
      {
        model: db.User,
        as: "user",
        attributes: ["id", "firstName", "lastName", "email"]
      }
    ],
    order: [[orderBy, orderDir]],
    limit: Number(limit),
    offset: Number(offset),
  });
}

async function getAuditLogById(id) {
  return db.audit_log.findByPk(id);
}

async function createAuditLog({ entity_type, entity_id, action, old_data, new_data, changed_by, changed_at = new Date() }) {
  return db.audit_log.create({
    entity_type,
    entity_id,
    action,
    old_data,
    new_data,
    changed_by,
    changed_at,
  });
}

module.exports = {
  getAuditLogs,
  getAuditLogById,
  createAuditLog,
};