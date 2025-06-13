//Modelos
const db = require("../models")
const User = db.User
//Librerías
const bcrypt = require("bcrypt")
//Esquemas
const { loginSchema, } = require("../schemas/user")
//Modulos de Herramientas
const { verifyRecaptcha } = require("../utils/verifyRecaptcha")
const createToken = require("../utils/createToken")
//Controlladores
const ErrorController = require("./error")

/**
 * AuthController
 * 
 * Controlador encargado de manejar la autenticación de usuarios.
 */
class AuthController {

  /**
   * Inicia sesión de un usuario.
   * 
   * - Valida los datos de entrada usando Zod.
   * - Verifica el token de reCAPTCHA.
   * - Busca el usuario por correo electrónico.
   * - Verifica la contraseña usando bcrypt.
   * - Genera un token JWT si la autenticación es exitosa.
   * - Devuelve el token en una cookie segura en producción o en la respuesta en desarrollo.
   * 
   * @async
   * @param {import('express').Request} req - Objeto de solicitud HTTP.
   * @param {import('express').Response} res - Objeto de respuesta HTTP.
   * @returns {Promise<void>}
   * 
   * @throws {ErrorController} Si hay errores de validación, autenticación o reCAPTCHA.
   * @throws {SequelizeDatabaseError} Si ocurre un error de base de datos.
   * @throws {Error} Para otros errores internos del servidor.
   */
  async login(req, res) {
    // Validación Zod
    const parsedData = await loginSchema.parseAsync(req.body)
      .catch(validationError => {
        // Extrae toda la información relevante del ZodError
        const details = validationError.errors.map(error => ({
          message: error.message,
          field: error.path.join('.'),
          code: error.code,
          received: error.received,
          expected: error.expected,
        }));

        throw new ErrorController(
          400,
          "Validation Error / Error de Validación",
          details
        );
      });

    const { email, password, recaptchaToken } = parsedData;

    // Validación de reCAPTCHA
    const responseRecaptcha = await verifyRecaptcha(recaptchaToken);
    if (!responseRecaptcha) {
      throw new ErrorController(
        400,
        "Token de reCAPTCHA inválido",
        { field: "recaptchaToken" }
      );
    }

    //Lógica de inicio de sesión
    const user = await User.findOne({
      where: { email },
      include: [
        { association: "services", required: false },
        { association: "requests", required: false },
      ],
    });

    if (!user) {
      throw new ErrorController(
        401,
        "Correo electrónico o contraseña incorrectos",
        { field: "email" }
      );
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
    if (error instanceof ErrorController) {
      console.error("Error Customizado:", error);
      return res.status(error.status).json({
        message: error.message,
        details: error.details,
      });
    }
    // Error de base de datos de Sequelize
    if (error.name === "SequelizeDatabaseError") {
      console.error("Error de base de datos:", error);
      return res.status(500).json({
        message: "Error de base de datos",
        details: error.message,
      });
    }
    // Otros errores
    console.error(error);
    return res.status(500).json({
      message: "Error interno del servidor",
      details: null,
    });
  }
}

module.exports = new AuthController();
