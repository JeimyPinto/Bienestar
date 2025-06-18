// helpers/audit.js
const db = require("../models/index.js");

async function createUserAudit({ user_id, action, old_data, new_data, changed_by }) {
  return db.user_audit.create({
    user_id,
    action,
    old_data: old_data || null,
    new_data: new_data || null,
    changed_by: changed_by || null
  });
}

async function createAuditLog({ entity_type, entity_id, action, old_data, new_data, changed_by }) {
  return db.audit_log.create({
    entity_type,
    entity_id,
    action,
    old_data: old_data || null,
    new_data: new_data || null,
    changed_by: changed_by || null,
    changed_at: new Date(),
  });
}

module.exports = { createUserAudit, createAuditLog };
