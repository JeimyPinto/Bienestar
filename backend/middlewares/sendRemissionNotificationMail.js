const { Service, User, Request } = require("../models");
const { sendRemissionNotificationIfProd } = require("../services/mail");
const chalk = require("chalk");

const sendRemissionNotificationMail = async (req, res, next) => {
  try {
    // Solo enviar correo si la remisión se creó exitosamente
    if (res.statusCode === 201 && res.locals.remission) {
      const remission = res.locals.remission;
      
      // Obtener la request asociada con sus datos
      const request = await Request.findByPk(remission.requestId, {
        include: [
          { 
        model: User, 
        as: "user",
          }
        ]
      });

      if (!request || !request.user) {
        console.warn(chalk.yellow.bold("⚠️  No se pudo obtener la solicitud asociada o el solicitante"));
        return next();
      }

      // Obtener el servicio con su creador
      const service = await Service.findByPk(request.serviceId, {
        include: [
          { 
        model: User, 
        as: "creator",
          }
        ]
      });

      if (!service || !service.creator || !service.creator.email) {
        console.warn(chalk.yellow.bold("⚠️  No se pudo obtener el creador del servicio o su email"));
        return next();
      }

      // Obtener el usuario asignado (profesional/responsable de la remisión)
      const assignedUser = await User.findByPk(remission.assignedUserId, {
        attributes: ["firstName", "lastName", "email"]
      });

      // Enviar correo usando el servicio centralizado
      await sendRemissionNotificationIfProd({
        serviceCreator: service.creator,
        applicant: request.user,
        assignedUser,
        remission,
        request,
        service
      });
    }
  } catch (error) {
    console.error(chalk.red.bold("📧 Error enviando correo de notificación de remisión:"), chalk.red(error.message || error));
  }
  
  next();
};

module.exports = sendRemissionNotificationMail;
