module.exports = ({ serviceCreator, applicant, assignedUser, remission, request, service, publicUrl, isDev }) => {
  const developmentWarning = require("./utils").getDevWarning(isDev);
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #28a745 0%, #20c997 100%); padding: 20px; text-align: center;">
        <h1 style="color: white; margin: 0;">Remisión Creada</h1>
      </div>
      
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
          <a href="${publicUrl}/remissions" 
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
  `;
};

