const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT ? parseInt(process.env.EMAIL_PORT) : 2525,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendUserCreatedMail({ to, firstName, password }) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: "¡Tu usuario ha sido creado!",
    html: `
      <div style="font-family: Arial, sans-serif; background: #f4f4f4; padding: 30px;">
        <div style="max-width: 500px; margin: auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); padding: 30px;">
          <h2 style="color: #2a7ae2; margin-top: 0;">¡Bienvenido/a, ${firstName}!</h2>
          <p style="font-size: 16px; color: #333;">Tu usuario ha sido creado exitosamente en la plataforma de <b>Bienestar</b>.</p>
          <div style="background: #f0f6ff; border-radius: 6px; padding: 16px; margin: 20px 0;">
            <p style="margin: 0 0 8px 0;"><b>Usuario (correo electrónico):</b> <span style="color: #2a7ae2;">${to}</span></p>
            <p style="margin: 0;"><b>Contraseña:</b> <span style="color: #2a7ae2;">${password}</span></p>
          </div>
          <p style="font-size: 15px; color: #555;">Puedes ingresar con estos datos en la plataforma.</p>
          <p style="font-size: 15px; color: #555;">Intenta iniciar sesión en el siguiente enlace: <a href="${process.env.PUBLIC_URL}/auth" style="color: #2a7ae2;">${process.env.PUBLIC_URL}/auth</a></p>
        </div>
      </div>
    `,
  };
  await transporter.sendMail(mailOptions);
}

async function sendUserUpdatedMail({ to, firstName }) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: "¡Tu usuario ha sido actualizado!",
    html: `
      <div style="font-family: Arial, sans-serif; background: #f4f4f4; padding: 30px;">
        <div style="max-width: 500px; margin: auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); padding: 30px;">
          <h2 style="color: #2a7ae2; margin-top: 0;">¡Hola, ${firstName}!</h2>
          <p style="font-size: 16px; color: #333;">Tu usuario ha sido actualizado exitosamente en la plataforma de <b>Bienestar</b>.</p>
          <p style="font-size: 15px; color: #555;">Puedes ingresar con tus datos actualizados en la plataforma.</p>
          <p style="font-size: 15px; color: #555;">Intenta iniciar sesión en el siguiente enlace: <a href="${process.env.PUBLIC_URL}/auth" style="color: #2a7ae2;">${process.env.PUBLIC_URL}/auth</a></p>
        </div>
      </div>
    `,
  };
  await transporter.sendMail(mailOptions);
}

async function sendWelcomeMailIfProd(user, plainPassword) {
  if (process.env.NODE_ENV === "production") {
    try {
      await sendUserCreatedMail({
        to: user.email,
        firstName: user.firstName,
        documentNumber: user.documentNumber,
        password: plainPassword
      });
      return true;
    } catch (mailError) {
      console.warn("Usuario creado, pero error enviando correo:", mailError.message);
      return false;
    }
  }
  return false;
}

async function sendRequestNotificationMail({ serviceCreator, applicant, request, service }) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: serviceCreator.email,
    subject: `Nueva solicitud de remisión para el servicio: ${service.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">Nueva Solicitud de Remisión</h1>
        </div>
        
        <div style="padding: 30px; background-color: #f8f9fa;">
          <h2 style="color: #333; margin-bottom: 20px;">Hola ${serviceCreator.firstName},</h2>
          
          <p style="color: #555; line-height: 1.6;">
            Se ha creado una nueva solicitud de remisión para tu servicio <strong>"${service.name}"</strong>.
          </p>
          
          <div style="background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); margin: 20px 0;">
            <h3 style="color: #667eea; margin-top: 0;">Detalles de la solicitud:</h3>
            <ul style="color: #555; line-height: 1.8;">
              <li><strong>ID de solicitud:</strong> #${request.id}</li>
              <li><strong>Solicitante:</strong> ${applicant.firstName} ${applicant.lastName}</li>
              <li><strong>Email del solicitante:</strong> ${applicant.email}</li>
              <li><strong>Documento:</strong> ${applicant.documentNumber}</li>
              <li><strong>Servicio:</strong> ${service.name}</li>
              <li><strong>Descripción:</strong> ${request.description}</li>
              <li><strong>Fecha de solicitud:</strong> ${new Date(request.createdAt).toLocaleDateString('es-ES')}</li>
            </ul>
          </div>
          
          <p style="color: #555; line-height: 1.6;">
            Por favor, revisa la solicitud en el sistema de gestión de bienestar para procesarla adecuadamente.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.PUBLIC_URL || 'http://localhost:3000'}/requests" 
               style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Ver Solicitudes
            </a>
          </div>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          
          <p style="color: #999; font-size: 12px; text-align: center;">
            Este es un correo automático del sistema de gestión de bienestar.
            <br>
            Por favor, no responder a este correo.
          </p>
        </div>
      </div>
    `,
  };
  await transporter.sendMail(mailOptions);
}

async function sendUpdateMailIfProd(user) {
  if (process.env.NODE_ENV === "production") {
    try {
      await sendUserUpdatedMail({
        to: user.email,
        firstName: user.firstName,
      });
      return true;
    } catch (mailError) {
      console.warn("Usuario actualizado, pero error enviando correo:", mailError.message);
      return false;
    }
  }
  return false;
}

async function sendRequestNotificationIfProd({ serviceCreator, applicant, request, service }) {
  if (process.env.NODE_ENV === "production") {
    try {
      await sendRequestNotificationMail({
        serviceCreator,
        applicant,
        request,
        service
      });
      console.log(`Correo de notificación enviado a ${serviceCreator.email} para la solicitud #${request.id}`);
      return true;
    } catch (mailError) {
      console.warn("Solicitud creada, pero error enviando correo de notificación:", mailError.message);
      return false;
    }
  }
  return false;
}

async function sendRemissionNotificationMail({ serviceCreator, applicant, assignedUser, remission, request, service }) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: serviceCreator.email,
    subject: `Remisión creada para el servicio: ${service.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #28a745 0%, #20c997 100%); padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">Remisión Creada</h1>
        </div>
        
        <div style="padding: 30px; background-color: #f8f9fa;">
          <h2 style="color: #333; margin-bottom: 20px;">Hola ${serviceCreator.firstName},</h2>
          
          <p style="color: #555; line-height: 1.6;">
            Se ha creado una remisión para tu servicio <strong>"${service.name}"</strong> basada en una solicitud aprobada.
          </p>
          
          <div style="background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); margin: 20px 0;">
            <h3 style="color: #28a745; margin-top: 0;">Detalles de la remisión:</h3>
            <ul style="color: #555; line-height: 1.8;">
              <li><strong>ID de remisión:</strong> #${remission.id}</li>
              <li><strong>Solicitud original:</strong> #${request.id}</li>
              <li><strong>Usuario remitido:</strong> ${applicant.firstName} ${applicant.lastName}</li>
              <li><strong>Email:</strong> ${applicant.email}</li>
              <li><strong>Documento:</strong> ${applicant.documentNumber}</li>
              <li><strong>Servicio:</strong> ${service.name}</li>
              ${assignedUser ? `<li><strong>Profesional asignado:</strong> ${assignedUser.firstName} ${assignedUser.lastName}</li>` : ''}
              <li><strong>Fecha de cita:</strong> ${new Date(remission.appointmentDate).toLocaleDateString('es-ES')}</li>
              <li><strong>Hora de cita:</strong> ${remission.appointmentTime}</li>
              <li><strong>Lugar:</strong> ${remission.location || 'No especificado'}</li>
              ${remission.observations ? `<li><strong>Observaciones:</strong> ${remission.observations}</li>` : ''}
              <li><strong>Fecha de creación:</strong> ${new Date(remission.createdAt).toLocaleDateString('es-ES')}</li>
            </ul>
          </div>
          
          <p style="color: #555; line-height: 1.6;">
            La solicitud original ha sido marcada como procesada. Puedes revisar todos los detalles en el sistema de gestión.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.PUBLIC_URL || 'http://localhost:3000'}/remissions" 
               style="background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Ver Remisiones
            </a>
          </div>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          
          <p style="color: #999; font-size: 12px; text-align: center;">
            Este es un correo automático del sistema de gestión de bienestar.
            <br>
            Por favor, no responder a este correo.
          </p>
        </div>
      </div>
    `,
  };
  await transporter.sendMail(mailOptions);
}

async function sendRemissionNotificationIfProd({ serviceCreator, applicant, assignedUser, remission, request, service }) {
  if (process.env.NODE_ENV === "production") {
    try {
      await sendRemissionNotificationMail({
        serviceCreator,
        applicant,
        assignedUser,
        remission,
        request,
        service
      });
      console.log(`Correo de notificación de remisión enviado a ${serviceCreator.email} para la remisión #${remission.id}`);
      return true;
    } catch (mailError) {
      console.warn("Remisión creada, pero error enviando correo de notificación:", mailError.message);
      return false;
    }
  }
  return false;
}

module.exports = {
  sendUserCreatedMail,
  sendUserUpdatedMail,
  sendRequestNotificationMail,
  sendWelcomeMailIfProd,
  sendUpdateMailIfProd,
  sendRequestNotificationIfProd,
  sendRemissionNotificationMail,
  sendRemissionNotificationIfProd,
};
