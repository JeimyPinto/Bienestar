const groupService = require("../services/group.js");
const { createGroupSchema, updateGroupSchema } = require("../schemas/group.js");
const { createAuditLog } = require("../services/auditLog.js");

class GroupController {
  async getAll(req, res, next) {
    try {
      const groups = await groupService.getAllGroups();
      res.status(200).json({
        message: "Grupos obtenidos correctamente",
        groups,
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const group = await groupService.getGroupById(req.params.id);
      if (!group) {
        const error = new Error("Grupo no encontrado");
        error.status = 404;
        throw error;
      }
      res.status(200).json({
        message: "Grupo obtenido correctamente",
        group,
      });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const groupData = createGroupSchema.parse(req.body);
      const group = await groupService.createGroup(groupData);
      await createAuditLog({
        entity_type: "Group",
        entity_id: group.id,
        action: "CREATE",
        old_data: null,
        new_data: group.toJSON(),
        changed_by: req.user?.id || null,
      });
      res.status(201).json({
        message: "Grupo creado correctamente",
        group,
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const groupData = updateGroupSchema.parse(req.body);
      // Obtener datos previos para auditoría
      const oldGroup = await groupService.getGroupById(req.params.id);
      const group = await groupService.updateGroup(req.params.id, groupData);
      if (!group) {
        const error = new Error("Grupo no encontrado");
        error.status = 404;
        throw error;
      }
      await createAuditLog({
        entity_type: "Group",
        entity_id: group.id,
        action: "UPDATE",
        old_data: oldGroup ? (oldGroup.toJSON ? oldGroup.toJSON() : oldGroup) : null,
        new_data: group.toJSON(),
        changed_by: req.user?.id || null,
      });
      res.status(200).json({
        message: "Grupo actualizado correctamente",
        group,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new GroupController();
