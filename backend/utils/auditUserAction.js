// Utilidad para registrar acciones de auditoría de usuario
// db: instancia de models/index.js
// params: { user_id, action, old_data, new_data, changed_by }
module.exports = async function auditUserAction(db, params) {
  try {
    await db.user_audit.create({
      user_id: params.user_id,
      action: params.action,
      old_data: params.old_data || null,
      new_data: params.new_data || null,
      changed_by: params.changed_by || null
    });
  } catch (error) {
    console.warn('No se pudo registrar auditoría:', error.message);
  }
};
