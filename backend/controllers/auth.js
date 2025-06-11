const db = require("../models");
const User = db.User;
const Service = db.Service;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { adminCreateUserSchema, loginSchema, } = require("../schemas/user");
const { verifyRecaptcha } = require("../utils/recaptcha");
const e = require("express");
class AuthController {
  async login(req, res) {
    let parsedData;
    try {
      // Validar los datos de entrada con el esquema
      parsedData = await loginSchema.parseAsync(req.body);
    } catch (validationError) {
      console.error("Validation error / Error de validación:", validationError);
      return res.status(400).json({
        message: "Validation error / Error de validación",
        errors: validationError.errors,
      });
    }

    const { email, password, recaptchaToken } = parsedData;

    try {
      // Validar el token de reCAPTCHA usando el módulo externo
      const recaptchaSuccess = await verifyRecaptcha(recaptchaToken);
      if (!recaptchaSuccess) {
        return res.status(400).json({
          message: "Invalid reCAPTCHA token / Token de reCAPTCHA inválido",
          token: null,
          error: "recaptcha"
        });
      }

      // Continuar con la lógica de inicio de sesión
      const user = await User.findOne({ where: { email } });
      if (!user) {
        // e: "email" para distinguir internamente
        return res.status(401).json({
          message:
            "Incorrect email or password / Correo electrónico o contraseña incorrectos",
          token: null,
          error: "email",
        });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        // e: "password" para distinguir internamente
        return res.status(401).json({
          message:
            "Incorrect email or password / Correo electrónico o contraseña incorrectos",
          token: null,
          error: "password",
        });
      }
      // Obtener los servicios asociados al usuario
      const services = await Service.findAll({
        where: { creatorId: user.id },
        attributes: [
          "id",
          "name",
          "description",
          "area",
          "image",
          "status",
          "createdAt",
          "updatedAt"
        ],
      });

      // Obtener las requests asociadas al usuario
      const requests = await db.Request.findAll({
        where: { userId: user.id },
        attributes: [
          "id",
          "serviceId",
          "description",
          "status",
          "createdAt",
          "updatedAt"
        ],
      });

      const token = jwt.sign(
        {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          documentType: user.documentType,
          documentNumber: user.documentNumber,
          phone: user.phone,
          email: user.email,
          status: user.status,
          role: user.role,
          image: user.image,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          services: services || [],
          requests: requests || [],
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      if (process.NODE_ENV == "produccion") {
        res.cookie("token", token, {
          httpOnly: true, // XSS
          secure: true, // HTTPS
          sameSite: "Strict",// CSRF
          maxAge: 3 * 60 * 60 * 1000,
        });
      }

      res.status(200).json({
        message: "Login successful / Inicio de sesión exitoso",
        token,
        error: null,
      });

    } catch (error) {
      res.status(500).json({
        message: null,
        token: null,
        error: "Error during login / Error durante el inicio de sesión ( " + error.message + " )",
      });
    }
  }

  async logout(req, res) {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({
        message:
          "Unauthorized, header required / No autorizado, encabezado requerido",
      });
    }

    const token = authHeader.split(" ")[1];
    const secret = process.env.JWT_SECRET;

    try {
      const decoded = jwt.verify(token, secret);
      res.clearCookie("token");
      res.json({ message: "Logout successful / Cierre de sesión exitoso" });
    } catch (error) {
      console.error(
        "Error during logout / Error durante el cierre de sesión:",
        error
      );
      res.status(500).json({
        message: "Error during logout / Error durante el cierre de sesión",
        error: error.message,
      });
    }
  }
}

module.exports = new AuthController();
