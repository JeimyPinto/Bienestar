// helpers/user.js
const ROLES = require("../constants/roles");

function canCreateRole(creatorRole, requestedRole) {
  if (creatorRole === ROLES.SUPERADMIN) return true;
  if (!requestedRole || requestedRole === ROLES.USER) return true;
  return false;
}

function getAllowedUpdateFields(userRole, body) {
  const allowedFields = [];
  if (userRole === ROLES.SUPERADMIN) {
    return { ...body };
  } else if (userRole === ROLES.ADMIN) {
    // Elimina 'role' del body sin asignar la variable
    const fields = { ...body };
    delete fields.role;
    return fields;
  } else {
    if (body.phone !== undefined) allowedFields.push(["phone", body.phone]);
    if (body.email !== undefined) allowedFields.push(["email", body.email]);
    if (body.image !== undefined) allowedFields.push(["image", body.image]);
    return Object.fromEntries(allowedFields);
  }
}

module.exports = {
  canCreateRole,
  getAllowedUpdateFields,
};
