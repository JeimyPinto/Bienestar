const nodemailer = require("nodemailer");
const chalk = require("chalk");

// URLs base para las imágenes (ajustar según el entorno)
const getBaseURL = () => {
  return process.env.NODE_ENV === "production" 
    ? process.env.PUBLIC_URL || "https://bienestarcpic.onrender.com"
    : "http://localhost:4000";
};

// Helper para generar el header con logos
const generateEmailHeader = (title, gradientColors = "#667eea 0%, #764ba2 100%") => {
  const baseURL = getBaseURL();
  return `
    <div style="background: linear-gradient(135deg, ${gradientColors}); padding: 20px; text-align: center; position: relative;">
      <!-- Logos en las esquinas -->
      <div style="position: absolute; top: 15px; left: 20px;">
        <img src="${baseURL}/public/images/email/logo-sena.png" alt="SENA" style="height: 40px; width: auto;" />
      </div>
      <div style="position: absolute; top: 15px; right: 20px;">
        <img src="${baseURL}/public/images/email/logo-bienestar.jpeg" alt="Bienestar" style="height: 40px; width: auto;" />
      </div>
      
      <!-- Título centrado -->
      <h1 style="color: white; margin: 0; padding-top: 10px;">${title}</h1>
    </div>
  `;
};

// Helper para generar el footer con logos
const generateEmailFooter = () => {
  const baseURL = getBaseURL();
  return `
    <div style="text-align: center; padding: 20px; background-color: #f8f9fa; border-top: 1px solid #eee;">
      <div style="margin-bottom: 15px;">
        <img src="${baseURL}/images/email/logo-sena.png" alt="SENA" style="height: 30px; margin: 0 10px;" />
        <img src="${baseURL}/images/email/logo-bienestar.png" alt="Bienestar" style="height: 30px; margin: 0 10px;" />
      </div>
      <p style="color: #999; font-size: 12px; margin: 5px 0;">
        Sistema de Gestión de Bienestar - SENA
      </p>
      <p style="color: #999; font-size: 12px; margin: 0;">
        Este es un correo automático. Por favor, no responder a este correo.
      </p>
    </div>
  `;
};

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT ? parseInt(process.env.EMAIL_PORT) : 587,
  secure: false, // true para puerto 465, false para otros puertos
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false
  }
});

async function sendUserCreatedMail({ to, firstName }) {
  const isDevelopment = process.env.NODE_ENV === "development";
  const developmentWarning = isDevelopment ? `
    <div style="background: #fff3cd; border: 2px solid #ffeaa7; border-radius: 6px; padding: 16px; margin: 20px 0;">
      <p style="margin: 0; color: #856404; font-weight: bold; text-align: center;">
        ⚠️ MENSAJE DE PRUEBA - IGNORAR ⚠️
      </p>
      <p style="margin: 8px 0 0 0; color: #856404; font-size: 14px; text-align: center;">
        Este correo ha sido enviado desde el aplicativo de pruebas y no representa algo serio. 
        Por favor, ignore este mensaje.
      </p>
    </div>
  ` : "";

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: isDevelopment ? "[PRUEBA] ¡Tu usuario ha sido creado!" : "¡Tu usuario ha sido creado!",
    html: `
      <div style="font-family: Arial, sans-serif; background: #f4f4f4; padding: 30px;">
        <div style="max-width: 500px; margin: auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); padding: 30px;">
          ${developmentWarning}
          ${generateEmailHeader("Bienvenido a Bienestar")}
          <h2 style="color: #2a7ae2; margin-top: 0;">¡Bienvenido/a, ${firstName}!</h2>
          <p style="font-size: 16px; color: #333;">Tu usuario ha sido creado exitosamente en la plataforma de <b>Bienestar</b>.</p>
          <div style="background: #f0f6ff; border-radius: 6px; padding: 16px; margin: 20px 0;">
            <p style="margin: 0 0 8px 0;"><b>Usuario (correo electrónico):</b> <span style="color: #2a7ae2;">${to}</span></p>
            <p style="margin: 0;"><b>Contraseña:</b> Es tu número de documento de identificación (escríbelo sin espacios ni puntos).</p>
          </div>
          <p style="font-size: 15px; color: #555;">Puedes ingresar con estos datos en la plataforma.</p>
          <p style="font-size: 15px; color: #555;">Intenta iniciar sesión en el siguiente enlace: <a href="${process.env.PUBLIC_URL}/auth" style="color: #2a7ae2;">${process.env.PUBLIC_URL}/auth</a></p>
          ${generateEmailFooter()}
        </div>
      </div>
    `,
  };
  await transporter.sendMail(mailOptions);
}

async function sendUserUpdatedMail({ to, firstName }) {
  const isDevelopment = process.env.NODE_ENV === "development";
  const developmentWarning = isDevelopment ? `
    <div style="background: #fff3cd; border: 2px solid #ffeaa7; border-radius: 6px; padding: 16px; margin: 20px 0;">
      <p style="margin: 0; color: #856404; font-weight: bold; text-align: center;">
        ⚠️ MENSAJE DE PRUEBA - IGNORAR ⚠️
      </p>
      <p style="margin: 8px 0 0 0; color: #856404; font-size: 14px; text-align: center;">
        Este correo ha sido enviado desde el aplicativo de pruebas y no representa algo serio. 
        Por favor, ignore este mensaje.
      </p>
    </div>
  ` : "";

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: isDevelopment ? "[PRUEBA] ¡Tu usuario ha sido actualizado!" : "¡Tu usuario ha sido actualizado!",
    html: `
      <div style="font-family: Arial, sans-serif; background: #f4f4f4; padding: 30px;">
        <div style="max-width: 500px; margin: auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); padding: 30px;">
          ${developmentWarning}
          ${generateEmailHeader("Actualización de Usuario")}
          <h2 style="color: #2a7ae2; margin-top: 0;">¡Hola, ${firstName}!</h2>
          <p style="font-size: 16px; color: #333;">Tu usuario ha sido actualizado exitosamente en la plataforma de <b>Bienestar</b>.</p>
          <p style="font-size: 15px; color: #555;">Puedes ingresar con tus datos actualizados en la plataforma.</p>
          <p style="font-size: 15px; color: #555;">Intenta iniciar sesión en el siguiente enlace: <a href="${process.env.PUBLIC_URL}/auth" style="color: #2a7ae2;">${process.env.PUBLIC_URL}/auth</a></p>
          ${generateEmailFooter()}
        </div>
      </div>
    `,
  };
  await transporter.sendMail(mailOptions);
}

async function sendWelcomeMailIfProd(user, plainPassword) {
  try {
    console.log(chalk.blue("📧 Enviando correo de bienvenida a:"), chalk.cyan(user.email));
    await sendUserCreatedMail({
      to: user.email,
      firstName: user.firstName,
      documentNumber: user.documentNumber,
      password: plainPassword
    });
    console.log(chalk.green("✅ Correo de bienvenida enviado exitosamente"));
    return true;
  } catch (mailError) {
    console.warn(chalk.red("⚠️ Usuario creado, pero error enviando correo:"), chalk.yellow(mailError.message));
    return false;
  }
}

async function sendRequestNotificationMail({ serviceCreator, applicant, request, service }) {
  const isDevelopment = process.env.NODE_ENV === "development";
  const developmentWarning = isDevelopment ? `
    <div style="background: #fff3cd; border: 2px solid #ffeaa7; border-radius: 6px; padding: 16px; margin: 20px 0;">
      <p style="margin: 0; color: #856404; font-weight: bold; text-align: center;">
        ⚠️ MENSAJE DE PRUEBA - IGNORAR ⚠️
      </p>
      <p style="margin: 8px 0 0 0; color: #856404; font-size: 14px; text-align: center;">
        Este correo ha sido enviado desde el aplicativo de pruebas y no representa algo serio. 
        Por favor, ignore este mensaje.
      </p>
    </div>
  ` : "";

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: serviceCreator.email,
    subject: isDevelopment ? `[PRUEBA] Nueva solicitud de remisión para el servicio: ${service.name}` : `Nueva solicitud de remisión para el servicio: ${service.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        ${generateEmailHeader("Nueva Solicitud de Remisión")}
        
        <div style="padding: 30px; background-color: #f8f9fa;">
          ${developmentWarning}
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
              <li><strong>Fecha de solicitud:</strong> ${new Date(request.createdAt).toLocaleDateString("es-ES")}</li>
            </ul>
          </div>
          
          <p style="color: #555; line-height: 1.6;">
            Por favor, revisa la solicitud en el sistema de gestión de bienestar para procesarla adecuadamente.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.PUBLIC_URL || "http://localhost:3000"}/requests" 
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
  try {
    console.log(chalk.blue("📧 Enviando correo de actualización de usuario a:"), chalk.cyan(user.email));
    await sendUserUpdatedMail({
      to: user.email,
      firstName: user.firstName,
    });
    console.log(chalk.green("✅ Correo de actualización enviado exitosamente"));
    return true;
  } catch (mailError) {
    console.warn(chalk.red("⚠️ Usuario actualizado, pero error enviando correo:"), chalk.yellow(mailError.message));
    return false;
  }
}

async function sendRequestNotificationIfProd({ serviceCreator, applicant, request, service }) {
  try {
    console.log(chalk.magenta("📨 Enviando notificación de solicitud a:"), chalk.cyan(serviceCreator.email));
    await sendRequestNotificationMail({
      serviceCreator,
      applicant,
      request,
      service
    });
    console.log(chalk.green(`✅ Correo de notificación enviado a ${serviceCreator.email} para la solicitud #${request.id}`));
    return true;
  } catch (mailError) {
    console.warn(chalk.red("⚠️ Solicitud creada, pero error enviando correo de notificación:"), chalk.yellow(mailError.message));
    return false;
  }
}

async function sendRemissionNotificationMail({ serviceCreator, applicant, assignedUser, remission, request, service }) {
  const isDevelopment = process.env.NODE_ENV === "development";
  const developmentWarning = isDevelopment ? `
    <div style="background: #fff3cd; border: 2px solid #ffeaa7; border-radius: 6px; padding: 16px; margin: 20px 0;">
      <p style="margin: 0; color: #856404; font-weight: bold; text-align: center;">
        ⚠️ MENSAJE DE PRUEBA - IGNORAR ⚠️
      </p>
      <p style="margin: 8px 0 0 0; color: #856404; font-size: 14px; text-align: center;">
        Este correo ha sido enviado desde el aplicativo de pruebas y no representa algo serio. 
        Por favor, ignore este mensaje.
      </p>
    </div>
  ` : "";

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: serviceCreator.email,
    subject: isDevelopment ? `[PRUEBA] Remisión creada para el servicio: ${service.name}` : `Remisión creada para el servicio: ${service.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        ${generateEmailHeader("Remisión Creada")}
        
        <div style="padding: 30px; background-color: #f8f9fa;">
          ${developmentWarning}
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
              ${assignedUser ? `<li><strong>Profesional asignado:</strong> ${assignedUser.firstName} ${assignedUser.lastName}</li>` : ""}
              <li><strong>Fecha de cita:</strong> ${new Date(remission.appointmentDate).toLocaleDateString("es-ES")}</li>
              <li><strong>Hora de cita:</strong> ${remission.appointmentTime}</li>
              <li><strong>Lugar:</strong> ${remission.location || "No especificado"}</li>
              ${remission.observations ? `<li><strong>Observaciones:</strong> ${remission.observations}</li>` : ""}
              <li><strong>Fecha de creación:</strong> ${new Date(remission.createdAt).toLocaleDateString("es-ES")}</li>
            </ul>
          </div>
          
          <p style="color: #555; line-height: 1.6;">
            La solicitud original ha sido marcada como procesada. Puedes revisar todos los detalles en el sistema de gestión.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.PUBLIC_URL || "http://localhost:3000"}/remissions" 
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
  try {
    console.log(chalk.green("📋 Enviando notificación de remisión a:"), chalk.cyan(serviceCreator.email));
    await sendRemissionNotificationMail({
      serviceCreator,
      applicant,
      assignedUser,
      remission,
      request,
      service
    });
    console.log(chalk.green(`✅ Correo de notificación de remisión enviado a ${serviceCreator.email} para la remisión #${remission.id}`));
    return true;
  } catch (mailError) {
    console.warn(chalk.red("⚠️ Remisión creada, pero error enviando correo de notificación:"), chalk.yellow(mailError.message));
    return false;
  }
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
