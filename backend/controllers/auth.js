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
          { association: "services", required: false },
          { association: "requests", required: false },
        ],
      });

      if (!user) {
        return res.status(404).json({
          message: "No existe un usuario registrado con ese email.",
         details: { field: "email" }
        });
      }
      if (!await bcrypt.compare(password, user.password)) {
        throw new ErrorController(
          401,
          "Correo electrónico o contraseña incorrectos",
          { field: "password" }
        );
      }
      const token = createToken(user);

      let response = {
        message: `Inicio de sesión exitoso para el usuario ${user.firstName}.
                Hora de inicio de sesión: ${new Date().toLocaleTimeString()}`
      };

      if (process.env.NODE_ENV === "production") {
        res.cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "Strict",
          maxAge: 60 * 60 * 1000,
        });
      } else {
        response.token = token;
      }

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
