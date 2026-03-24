module.exports = ({ serviceCreator, applicant, request, service, publicUrl, isDev }) => {
  const developmentWarning = require("./utils").getDevWarning(isDev);
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center;">
        <h1 style="color: white; margin: 0;">Nueva Solicitud de Remisión</h1>
      </div>
      
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
          <a href="${publicUrl}/requests" 
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
  `;
};

