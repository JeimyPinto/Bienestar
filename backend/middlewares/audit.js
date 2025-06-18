const { createUserAudit } = require("../helpers/audit.js");
const db = require("../models/index.js");

/**
 * Middleware de auditoría para registrar acciones sobre usuarios
 * @param {string} action - 'INSERT', 'UPDATE', 'DELETE'
 * @returns Middleware Express
 */
function auditUser(action) {
  return async (req, res, next) => {
    // Espera a que la respuesta termine para auditar el resultado
    res.on("finish", async () => {
      // Solo auditar si la respuesta fue exitosa (201 o 200)
      if (![200, 201].includes(res.statusCode)) return;
      try {
        let user = res.locals.user || res.locals.updatedUser || res.locals.deletedUser;
        if (!user && res.locals.userId) {
          user = await db.User.findByPk(res.locals.userId);
        }
        if (!user) return;
        let old_data = res.locals.oldUserData || null;
        let new_data = user.get ? user.get({ plain: true }) : user;
        // Usar el helper para crear la auditoría
        await createUserAudit({
          user_id: user.id,
          action,
          old_data,
          new_data,
          changed_by: req.user ? req.user.email : null
        });
      } catch (err) {
        console.warn("Error en auditoría:", err.message);
      }
    });
    next();
  };
}

module.exports = { auditUser };
