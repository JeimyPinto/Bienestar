// services/mailService.js
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

module.exports = {
  sendUserCreatedMail,
  sendUserUpdatedMail,
  sendWelcomeMailIfProd,
  sendUpdateMailIfProd,
};
