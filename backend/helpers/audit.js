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

module.exports = { createUserAudit };
