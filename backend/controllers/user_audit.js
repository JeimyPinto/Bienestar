const { createUserAudit } = require("../helpers/audit.js");

class UserAuditController {
  async create(req, res, next) {
    try {
      const { user_id, action, old_data, new_data, changed_by } = req.body;
      const audit = await createUserAudit({
        user_id,
        action,
        old_data,
        new_data,
        changed_by
      });
      res.status(201).json({
        message: "Auditoría registrada correctamente",
        audit,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserAuditController();
