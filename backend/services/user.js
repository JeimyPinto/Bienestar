const db = require("../models/index.js");
const User = db.User;
const { canCreateRole, getAllowedUpdateFields } = require("../helpers/user.js");
const { hashPassword } = require("../helpers/hash.js");
const fs = require("fs");
const { sendWelcomeMail,sendUpdateMail } = require("./mail");

async function getAllUsers() {
  return await User.findAll({
    include: [
      { association: "services", required: false },
      { association: "requests", required: false },
      { association: "group", required: false },
      { association: "managedGroups", required: false },
    ],
  });
}

async function getAllActiveUsers() {
  return await User.findAll({
    include: [
      { association: "services", required: false },
      { association: "requests", required: false },
      { association: "group", required: false },
      { association: "managedGroups", required: false },
    ],
    where: { status: "activo" },
  });
}

async function getAllPaginatedUsers(page = 1, limit = 10) {
  const offset = (page - 1) * limit;
  return await User.findAndCountAll({
    limit,
    offset,
    include: [
      { association: "services", required: false },
      { association: "requests", required: false },
      { association: "group", required: false },
      { association: "managedGroups", required: false },
    ],
  });
}

async function getUserById(id) {
  return await User.findByPk(id, {
    include: [
      { association: "services", required: false },
      { association: "requests", required: false },
      { association: "group", required: false },
      { association: "managedGroups", required: false },
    ],
  });
}

async function createUser(userData, file, creatorRole) {
  const requestedRole = userData.role;
  if (!canCreateRole(creatorRole, requestedRole)) {
    const error = new Error("No tienes permisos para crear usuarios con roles distintos a 'user'");
    error.status = 403;
    error.details = { creatorRole, requestedRole };
    throw error;
  }
  // Validación de unicidad de documento
  const existingUser = await User.findOne({ where: { documentNumber: userData.documentNumber } });
  if (existingUser) {
    const error = new Error("Ya existe un usuario con ese número de documento");
    error.status = 409;
    error.details = { documentNumber: userData.documentNumber };
    throw error;
  }
  // Validación de unicidad de email
  const existingEmail = await User.findOne({ where: { email: userData.email } });
  if (existingEmail) {
    const error = new Error("Ya existe un usuario con ese email");
    error.status = 409;
    error.details = { email: userData.email };
    throw error;
  }
  const plainPassword = userData.password && userData.password.trim() !== ""
    ? userData.password
    : userData.documentNumber;
  const hashedPassword = await hashPassword(plainPassword);
  const user = await User.create({
    firstName: userData.firstName,
    lastName: userData.lastName,
    documentType: userData.documentType,
    documentNumber: userData.documentNumber,
    phone: userData.phone,
    email: userData.email,
    password: hashedPassword,
    status: "activo",
    role: userData.role,
    groupId: userData.groupId ?? null,
    image: null
  });
  if (file && file.filename) {
    user.image = file.filename;
    await user.update({ image: user.image });
  }
  // Enviar correo de bienvenida si corresponde
  await sendWelcomeMail(user, plainPassword);
  return user;
}

async function updateUser(userId, reqUser, body, file) {
  console.log("🔍 Actualizando usuario:", { userId, body, userRole: reqUser?.role });

  const user = await User.findByPk(userId);
  if (!user) {
    const error = new Error("Usuario no encontrado");
    error.status = 404;
    throw error;
  }

  let updateFields = getAllowedUpdateFields(reqUser?.role, body);
  console.log("📝 Campos permitidos para actualizar:", updateFields);

  // Procesar groupId especialmente
  if (updateFields.hasOwnProperty("groupId")) {
    // Convertir string vacío o "null" a null
    if (updateFields.groupId === "" || updateFields.groupId === "null" || updateFields.groupId === undefined) {
      updateFields.groupId = null;
    } else if (updateFields.groupId !== null) {
      // Asegurar que sea un número válido
      const groupIdNum = parseInt(updateFields.groupId);
      updateFields.groupId = isNaN(groupIdNum) ? null : groupIdNum;
    }
  }

  // Procesar password
  updateFields.password = await hashPassword(updateFields.password, user.password);

  // Manejo de archivo de imagen
  if (file && file.filename) {
    user.image = file.filename;
    await user.update({ image: user.image });
    updateFields.image = file.filename;
  }

  // Eliminar campos undefined para evitar errores de SQL
  Object.keys(updateFields).forEach(key => {
    if (updateFields[key] === undefined) {
      delete updateFields[key];
    }
  });

  console.log("🔄 Campos finales a actualizar:", updateFields);

  const oldUserData = user.get({ plain: true });
  await user.update(updateFields);

  // Enviar correo de actualización si corresponde
  await sendUpdateMail(user);
  return { user, oldUserData };
}

function removeUploadedFile(file) {
  if (file) {
    try {
      fs.unlinkSync(file.path);
    } catch (err) {
      console.warn("No se pudo eliminar el archivo subido tras error:", err.message);
    }
  }
}
async function getUsersByRole(role) {
  return await User.findAll({
    where: { role },
  });
}

module.exports = {
  getAllUsers,
  getAllActiveUsers,
  getAllPaginatedUsers,
  getUsersByRole,
  getUserById,
  createUser,
  updateUser,
  removeUploadedFile,
  getUsersByRole,
};
