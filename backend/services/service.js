const db = require("../models/index.js");
const Service = db.Service;
const User = db.User;
const fs = require("fs");
const chalk = require("chalk");

// Helper function to generate service detail URL
function generateServiceDetailUrl(area, id) {
  const areaSlugMap = {
    "Salud": "salud",
    "Arte y Cultura": "arte-cultura",
    "Deporte y Recreación": "deporte-recreacion",
    "Apoyo Socioeconomico y Reconocimiento a la Excelencia": "apoyo-socioeconomico",
    "Apoyo Psicosocial": "apoyo-psicosocial"
  };
  
  const areaSlug = areaSlugMap[area] || area.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
  return `/${areaSlug}/${id}`;
}

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
  
  // Generate detailUrl automatically
  const detailUrl = generateServiceDetailUrl(serviceData.area, service.id);
  
  // Update service with image and detailUrl
  const updateData = { detailUrl };
  if (file) {
    updateData.image = file.filename;
  }
  
  await service.update(updateData);
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
  
  // If area changed, regenerate detailUrl
  if (serviceData.area && serviceData.area !== service.area) {
    updatedFields.detailUrl = generateServiceDetailUrl(serviceData.area, serviceId);
  }
  
  if (file) {
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
  
  // If area changed, regenerate detailUrl
  if (serviceData.area && serviceData.area !== service.area) {
    updatedFields.detailUrl = generateServiceDetailUrl(serviceData.area, serviceId);
  }
  
  if (file) {
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
