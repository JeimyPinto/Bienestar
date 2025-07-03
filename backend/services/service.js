const db = require("../models/index.js");
const Service = db.Service;
const User = db.User;
const fs = require("fs");
const chalk = require("chalk");

async function getAllServices() {
  return await Service.findAll({
    include: {
      association: "creator",
      model: User,
    },
  });
}

async function getAllActiveServices() {
  return await Service.findAll({
    where: { status: "activo" },
    include: {
      association: "creator",
      model: User,
    },
  });
}

async function getServiceById(id) {
  return await Service.findByPk(id, {
    include: {
      association: "creator",
      model: User,
    },
  });
}

async function getServicesByUserId(userId) {
  return await Service.findAll({
    where: { creatorId: userId },
    include: {
      association: "creator",
      model: User,
    },
  });
}

async function createService(serviceData, file) {
  const service = await Service.create({
    ...serviceData,
    image: null,
  });
  if (file) {
    service.image = file.filename;
    await service.update({ image: service.image });
  }
  return service;
}

async function updateService(serviceId, serviceData, file) {
  const service = await Service.findByPk(serviceId);
  if (!service) {
    const error = new Error("Servicio no encontrado");
    error.status = 404;
    error.details = { service: null };
    throw error;
  }
  let updatedFields = { ...serviceData };
  if (file) {
    await service.update({ image: file.filename });
    updatedFields.image = file.filename;
  }
  await service.update(updatedFields);
  return { service, updatedFields };
}

async function updateServiceWithAudit(serviceId, serviceData, file) {
  const service = await Service.findByPk(serviceId);
  if (!service) {
    const error = new Error("Servicio no encontrado");
    error.status = 404;
    error.details = { service: null };
    throw error;
  }
  const oldService = service.toJSON();
  let updatedFields = { ...serviceData };
  if (file) {
    await service.update({ image: file.filename });
    updatedFields.image = file.filename;
  }
  await service.update(updatedFields);
  return { oldService, updatedService: service.toJSON() };
}

function removeUploadedFile(file) {
  if (file) {
    try {
      fs.unlinkSync(file.path);
    } catch (err) {
      console.warn(chalk.yellow.bold("⚠️  No se pudo eliminar el archivo subido tras error:"), chalk.yellow(err.message));
    }
  }
}

module.exports = {
  getAllServices,
  getAllActiveServices,
  getServiceById,
  getServicesByUserId,
  createService,
  updateService,
  updateServiceWithAudit,
  removeUploadedFile,
};
