const auditLogService = require("../services/auditLog.js");

class AuditLogController {
  async getAll(req, res, next) {
    try {
      const logs = await auditLogService.getAuditLogs(req.query);
      res.status(200).json({ message: "Audit logs retrieved", logs });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const log = await auditLogService.getAuditLogById(req.params.id);
      if (!log) {
        return res.status(404).json({ message: "Audit log not found" });
      }
      res.status(200).json({ message: "Audit log retrieved", log });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuditLogController();
