const db = require("../models");
const User = db.User;
const fetch = require("node-fetch");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const {
  adminCreateUserSchema,
  userUpdateSelfSchema,
  adminUpdateUserSchema,
  loginSchema,
} = require("../schemas/user");
const path = require("path");
const fs = require("fs");
const { verifyRecaptcha } = require("../utils/recaptcha");
class AuthController {
  /**
   * Registra un nuevo usuario en el sistema.
   *
   * @async
   * @function register
   * @param {Object} req - Objeto de solicitud de Express.
   * @param {Object} req.body - Cuerpo de la solicitud que contiene los datos del usuario.
   * @param {Object} res - Objeto de respuesta de Express.
   * @returns Un mensaje de éxito o un mensaje de error
   * @since 11/03/2025
   * @version 19/05/2025
   * @autor Jeimy Pinto
   * @returns {Promise<void>} - Responde con un mensaje de éxito o error.
   * @throws {ValidationError} - Si los datos de entrada no cumplen con el esquema de validación.
   * @throws {SequelizeValidationError} - Si hay un error de validación de Sequelize.
   * @throws {SequelizeDatabaseError} - Si hay un error de base de datos de Sequelize.
   * @throws {Error} - Si ocurre cualquier otro error durante el registro.
   */
  async register(req, res) {
    let parsedData;
    try {
      parsedData = await adminCreateUserSchema.parseAsync(req.body);
    } catch (validationError) {
      console.error("Validation error:/Error de validación:", validationError);
      return res.status(400).json({
        message: "Validation error/Error de validación",
        errors: validationError.errors,
      });
    }

    const {
      firstName,
      lastName,
      documentType,
      documentNumber,
      phone,
      email,
      password,
      role,
      status = "activo",
    } = parsedData;

    try {
      const user = await User.findOne({ where: { documentNumber } });
      if (user) {
        return res.status(400).json({
          message:
            "A user with that document already exists / Ya existe un usuario con ese documento",
        });
      }
      let fileName = null;
      // Si hay un archivo, cambiar su nombre a un UUID y moverlo a uploads/temp
      if (req.file) {
        const tempPath = path.join(
          __dirname,
          "..",
          "uploads",
          "temp",
          req.file.filename
        );
        // Generar un nuevo nombre único para el archivo
        fileName = `${crypto.randomUUID()}${path.extname(
          req.file.originalname
        )}`;
        const finalPath = path.join(
          __dirname,
          "..",
          "uploads",
          "temp",
          fileName
        );

        try {
          // Renombrar el archivo
          fs.renameSync(tempPath, finalPath);
          console.log("Archivo renombrado y movido a:", finalPath);
        } catch (error) {
          console.error("Error al mover el archivo:", error);
          return res.status(500).json({
            message: "Error processing the file / Error procesando el archivo",
            error: error.message,
          });
        }
      }
      // Crear el usuario en la base de datos
      const newUser = await User.create({
        firstName,
        lastName,
        documentType,
        documentNumber,
        phone,
        email,
        password: bcrypt.hashSync(password, 10),
        image: fileName,
        status,
        role,
      });
      res.json({
        message: "User registered successfully / Usuario registrado con éxito",
        user: {
          ...newUser.toJSON(),
          image: newUser.image
            ? `${req.protocol}://${req.get("host")}/uploads/temp/${
                newUser.image
              }`
            : null,
        },
      });
    } catch (error) {
      console.error(
        "Error during registration / Error durante el registro:",
        error
      );
      if (error.name === "SequelizeValidationError") {
        res.status(400).json({
          message: "Validation error / Error de validación",
          errors: error.errors,
        });
      } else if (error.name === "SequelizeDatabaseError") {
        res.status(500).json({
          message: "Database error / Error de base de datos",
          error: error.message,
        });
      } else {
        res.status(500).json({
          message: "Error registering the user / Error registrando el usuario",
          error: error.message,
        });
      }
    }
  }
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
        return res.status(400).json({ message: "Invalid reCAPTCHA token / Token de reCAPTCHA inválido" });
      }

      // Continuar con la lógica de inicio de sesión
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({
          message:
            "Incorrect email or password / Correo electrónico o contraseña incorrectos (e)",
        });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({
          message:
            "Incorrect email or password / Correo electrónico o contraseña incorrectos (p)",
        });
      }

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
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.json({
        message: "Login successful / Inicio de sesión exitoso",
        token,
      });
    } catch (error) {
      console.error(
        "Error during login / Error durante el inicio de sesión:",
        error
      );
      res.status(500).json({
        message: "Error during login / Error durante el inicio de sesión",
        error,
      });
    }
  }

  /**
   * Cierra la sesión de un usuario.
   * Recibe el encabezado de autorización, si el token es válido, lo agrega a la lista
   * de tokens inválidos.
   * @async
   * @function logout
   * @param {Object} req - Objeto de solicitud de Express.
   * @param {Object} req.headers - Encabezados de la solicitud.
   * @param {string} req.headers.authorization - Encabezado de autorización que contiene el token JWT.
   * @param {Object} res - Objeto de respuesta de Express.
   * @returns {Promise<void>} Envía una respuesta JSON con un mensaje de éxito si el cierre de sesión es exitoso,
   * o un mensaje de error si el cierre de sesión falla.
   * @version 15/11/2024
   * @autor Jeimy Pinto
   */
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
