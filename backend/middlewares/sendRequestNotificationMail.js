const { Service, User } = require("../models");
const { sendRequestNotificationIfProd } = require("../services/mail");
const chalk = require("chalk");

const sendRequestNotificationMail = async (req, res, next) => {
  try {
    // Solo enviar correo si la request se creó exitosamente
    if (res.statusCode === 201 && res.locals.request) {
      const request = res.locals.request;
      
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

      // Obtener datos del solicitante
      const applicant = await User.findByPk(request.userId, {
        attributes: ["firstName", "lastName", "email", "documentNumber"]
      });

      if (!applicant) {
        console.warn(chalk.yellow.bold("⚠️  No se pudo obtener los datos del solicitante"));
        return next();
      }

      // Enviar correo usando el servicio centralizado
      await sendRequestNotificationIfProd({
        serviceCreator: service.creator,
        applicant,
        request,
        service
      });
        }
      } catch (error) {
        console.error(chalk.red.bold("📧 Error enviando correo de notificación de solicitud:"), chalk.red(error.message || error));
    // No detener la ejecución si falla el envío del correo
  }
  
  next();
};

module.exports = sendRequestNotificationMail;
