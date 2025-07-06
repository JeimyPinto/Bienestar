//Modelos
const db = require("../models");
const User = db.User;
//Librerías
const bcrypt = require("bcrypt");
//Modulos de Herramientas
const createToken = require("../helpers/createToken");

class AuthController {
  async login(req, res, next) {
    try {
      // Ya validado y verificado por middlewares
      const { email, password } = req.body;

      //Lógica de inicio de sesión
      const user = await User.findOne({
        where: { email },
        include: [
          { 
            association: "group",
            required: false,
            attributes: ["id", "programName", "fichaNumber", "programType", "fichaStatus"]
          },
          { association: "services", required: false },
          { association: "requests", required: false },
        ],
      });

      if (!user) {
        return res.status(404).json({
          error: true,
          status: 404,
          message: "No existe un usuario registrado con ese email.",
          details: { field: "email" }
        });
      }
      if (!await bcrypt.compare(password, user.password)) {
        return res.status(401).json({
          error: true,
          status: 401,
          message: "Correo electrónico o contraseña incorrectos",
          details: { field: "password" }
        });
      }
      const token = createToken(user);

      // Siempre enviar el token en la respuesta (localStorage)
      const response = {
        message: `Inicio de sesión exitoso para el usuario ${user.firstName}. Hora de inicio de sesión: ${new Date().toLocaleTimeString()}`,
        token: token,
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          documentType: user.documentType,
          documentNumber: user.documentNumber,
          phone: user.phone,
          email: user.email,
          role: user.role,
          status: user.status,
          image: user.image,
          groupId: user.groupId,
          group: user.group ? {
            id: user.group.id,
            programName: user.group.programName,
            fichaNumber: user.group.fichaNumber,
            programType: user.group.programType,
            fichaStatus: user.group.fichaStatus
          } : null,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt
        }
      };

      res.status(200).json(response);
    } catch(error) {
      next(error);
    }
  }

  // POST /auth/verify-recaptcha
  async verifyRecaptcha(req, res, next) {
    try {
      const { recaptchaToken } = req.body;
      if (!recaptchaToken) {
        return res.status(400).json({ success: false, message: "Falta el token de reCAPTCHA" });
      }
      const { verifyRecaptcha } = require("../helpers/verifyRecaptcha");
      const responseRecaptcha = await verifyRecaptcha(recaptchaToken);
      if (!responseRecaptcha || !responseRecaptcha.success) {
        return res.status(400).json({ success: false, message: "Token de reCAPTCHA inválido" });
      }
      return res.json({ success: true, message: "reCAPTCHA válido" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
