module.exports = ({ firstName, publicUrl, isDev }) => {
  const developmentWarning = require("./utils").getDevWarning(isDev);
  return `
    <div style="font-family: Arial, sans-serif; background: #f4f4f4; padding: 30px;">
      <div style="max-width: 500px; margin: auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); padding: 30px;">
        ${developmentWarning}
        <h2 style="color: #2a7ae2; margin-top: 0;">¡Hola, ${firstName}!</h2>
        <p style="font-size: 16px; color: #333;">Tu usuario ha sido actualizado exitosamente en la plataforma de <b>Bienestar</b>.</p>
        <p style="font-size: 15px; color: #555;">Puedes ingresar con tus datos actualizados en la plataforma.</p>
        <p style="font-size: 15px; color: #555;">Intenta iniciar sesión en el siguiente enlace: <a href="${publicUrl}/auth" style="color: #2a7ae2;">${publicUrl}/auth</a></p>
      </div>
    </div>
  `;
};

