module.exports = ({ firstName, newPassword, publicUrl, isDev }) => {
  const developmentWarning = require("./utils").getDevWarning(isDev);
  return `
    <div style="font-family: Arial, sans-serif; background: #f4f4f4; padding: 30px;">
      <div style="max-width: 500px; margin: auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); padding: 30px;">
        ${developmentWarning}
        <h2 style="color: #e67e22; margin-top: 0;">¡Hola, ${firstName}!</h2>
        <p style="font-size: 16px; color: #333;">Un administrador ha reestablecido tu contraseña en la plataforma de <b>Bienestar</b>.</p>
        <div style="background: #fff8f0; border-radius: 6px; padding: 16px; margin: 20px 0; border-left: 4px solid #e67e22;">
          <p style="margin: 0 0 8px 0;"><b>Nueva Contraseña Temporal:</b> <span style="color: #e67e22; font-family: monospace; font-size: 18px;">${newPassword}</span></p>
        </div>
        <p style="font-size: 15px; color: #555;">Por seguridad, el sistema te solicitará cambiar esta contraseña la próxima vez que inicies sesión.</p>
        <p style="font-size: 15px; color: #555;">Ingresa aquí: <a href="${publicUrl}/auth" style="color: #2a7ae2;">Portal de Bienestar</a></p>
      </div>
    </div>
  `;
};

