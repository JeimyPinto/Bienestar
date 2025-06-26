const { Service, User, Request } = require("../models");
const { sendRemissionNotificationIfProd } = require("../services/mail");

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
            as: 'user',
            attributes: ['id', 'firstName', 'lastName', 'email', 'documentNumber']
          }
        ]
      });

      if (!request || !request.user) {
        console.log('No se pudo obtener la solicitud asociada o el solicitante');
        return next();
      }

      // Obtener el servicio con su creador
      const service = await Service.findByPk(request.serviceId, {
        include: [
          { 
            model: User, 
            as: 'creator',
            attributes: ['id', 'firstName', 'lastName', 'email']
          }
        ]
      });

      if (!service || !service.creator || !service.creator.email) {
        console.log('No se pudo obtener el creador del servicio o su email');
        return next();
      }

      // Obtener el usuario asignado (profesional/responsable de la remisión)
      const assignedUser = await User.findByPk(remission.assignedUserId, {
        attributes: ['firstName', 'lastName', 'email']
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
    console.error('Error enviando correo de notificación de remisión:', error);
    // No detener la ejecución si falla el envío del correo
  }
  
  next();
};

module.exports = sendRemissionNotificationMail;
