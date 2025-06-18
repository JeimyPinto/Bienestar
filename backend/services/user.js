const db = require("../models/index.js");
const User = db.User;
const saveUserImage = require("../utils/saveUserImage.js");
const { canCreateRole, getAllowedUpdateFields } = require("../helpers/user.js");
const { hashPassword } = require("../helpers/hash.js");
const fs = require("fs");

async function getAllUsers() {
  return await User.findAll({
    include: [
      { association: "services", required: false },
      { association: "requests", required: false },
    ],
  });
}

async function getAllActiveUsers() {
  return await User.findAll({
    include: [
      { association: "services", required: false },
      { association: "requests", required: false },
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
      { association: "services" },
      { association: "requests" },
    ],
  });
}

async function getUserById(id) {
  return await User.findByPk(id, {
    include: [
      { association: "services", required: false },
      { association: "requests", required: false },
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
  if (file) {
    await saveUserImage(user, file);
  }
  return user;
}

async function updateUser(userId, reqUser, body, file) {
  const user = await User.findByPk(userId);
  if (!user) {
    const error = new Error("Usuario no encontrado");
    error.status = 404;
    throw error;
  }
  let updateFields = getAllowedUpdateFields(reqUser?.role, body);
  updateFields.password = await hashPassword(updateFields.password, user.password);
  if (file) {
    await saveUserImage(user, file);
    updateFields.image = file.filename;
  }
  const oldUserData = user.get({ plain: true });
  await user.update(updateFields);
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

module.exports = {
  getAllUsers,
  getAllActiveUsers,
  getAllPaginatedUsers,
  getUserById,
  createUser,
  updateUser,
  removeUploadedFile,
};
