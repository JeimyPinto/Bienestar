const nodemailer = require("nodemailer");

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST || "smtp.gmail.com",
      port: parseInt(process.env.MAIL_PORT) || 587,
      secure: (process.env.MAIL_SECURE === "true"),
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false
      }
    });
  }

  async sendUserCreated({ firstName, to, password, publicUrl, isDev }) {
    try {
      const getTemplate = require("./templates/userCreated");
      const html = getTemplate({ firstName, to, password, publicUrl, isDev });
      
      await this.transporter.sendMail({
        from: `"Bienestar" <${process.env.MAIL_USER || "no-reply@bienestar.com"}>`,
        to,
        subject: "Bienvenido a Bienestar",
        html
      });
    } catch (error) {
      const err = new Error("Error sending user created email: " + error.message);
      err.status = 500;
      throw err;
    }
  }

  async sendUserPasswordReset({ firstName, newPassword, publicUrl, isDev, to }) {
    try {
      const getTemplate = require("./templates/userPasswordReset");
      const html = getTemplate({ firstName, newPassword, publicUrl, isDev });
      
      await this.transporter.sendMail({
        from: `"Bienestar" <${process.env.MAIL_USER || "no-reply@bienestar.com"}>`,
        to,
        subject: "Contraseña Reestablecida - Bienestar",
        html
      });
    } catch (error) {
      const err = new Error("Error sending password reset email: " + error.message);
      err.status = 500;
      throw err;
    }
  }

  async sendUserUpdated({ firstName, publicUrl, isDev, to }) {
    try {
      const getTemplate = require("./templates/userUpdated");
      const html = getTemplate({ firstName, publicUrl, isDev });
      
      await this.transporter.sendMail({
        from: `"Bienestar" <${process.env.MAIL_USER || "no-reply@bienestar.com"}>`,
        to,
        subject: "Usuario Actualizado - Bienestar",
        html
      });
    } catch (error) {
      const err = new Error("Error sending user updated email: " + error.message);
      err.status = 500;
      throw err;
    }
  }

  async sendRequestNotification({ serviceCreator, applicant, request, service, publicUrl, isDev, serviceCreatorEmail }) {
    try {
      const getTemplate = require("./templates/requestNotification");
      const html = getTemplate({ serviceCreator, applicant, request, service, publicUrl, isDev });
      
      await this.transporter.sendMail({
        from: `"Bienestar" <${process.env.MAIL_USER || "no-reply@bienestar.com"}>`,
        to: serviceCreatorEmail,
        subject: "Nueva Solicitud de Remisión",
        html
      });
    } catch (error) {
      const err = new Error("Error sending request notification: " + error.message);
      err.status = 500;
      throw err;
    }
  }

  async sendRemissionNotification({ serviceCreator, applicant, assignedUser, remission, request, service, publicUrl, isDev, serviceCreatorEmail }) {
    try {
      const getTemplate = require("./templates/remissionNotification");
      const html = getTemplate({ serviceCreator, applicant, assignedUser, remission, request, service, publicUrl, isDev });
      
      await this.transporter.sendMail({
        from: `"Bienestar" <${process.env.MAIL_USER || "no-reply@bienestar.com"}>`,
        to: serviceCreatorEmail,
        subject: "Remisión Creada",
        html
      });
    } catch (error) {
      const err = new Error("Error sending remission notification: " + error.message);
      err.status = 500;
      throw err;
    }
  }

  async sendGenericMail({ to, subject, html }) {
    try {
      await this.transporter.sendMail({
        from: `"Bienestar" <${process.env.MAIL_USER || "no-reply@bienestar.com"}>`,
        to,
        subject,
        html
      });
    } catch (error) {
      const err = new Error("Error sending generic mail: " + error.message);
      err.status = 500;
      throw err;
    }
  }
}

module.exports = new MailService();

