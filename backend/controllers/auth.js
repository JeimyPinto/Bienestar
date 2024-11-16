const db = require("../models");
const Usuario = db.Usuario;
const usuarioSchema = require("../schemas/usuario");
const { authenticateUser } = require("../middlewares/auth");
const jwt = require("jsonwebtoken");

class AuthController {
  /**
   * Inicia sesión en la aplicación.
   * Recibe los datos del usuario, valida los datos según el esquema,
   * @param {*} req el correo y la contraseña del usuario
   * @param {*} res si el usuario y la contraseña son correctos, retorna un token
   * @returns El token de autenticación o un mensaje de error
   * @version 15/11/2024
   * @author Jeimy Pinto
   */
  async login(req, res) {
    const { email, password } = req.body;
    const parsedData = await usuarioSchema.parseAsync({ email, password });
    const secret = process.env.JWT_SECRET;

    try {
      const token = await authenticateUser(
        parsedData.email,
        parsedData.password
      );
      const payload = jwt.verify(token, secret);
      res.status(200).send({ status: 200, data: token, user: payload });
    } catch (error) {
      res
        .status(error.status || 500)
        .send({ status: "FAILED", data: error.message });
    }
  }

  /**
   * Registra un usuario en la aplicación.
   * Recibe los datos del usuario, valida los datos según el esquema,
   * busca un usuario con el documento proporcionado, si no lo encuentra,
   * crea un nuevo usuario en la base de datos.
   * @param {*} req el correo y la contraseña del usuario
   * @param {*} res si el usuario se registró correctamente, retorna un mensaje de éxito
   * @returns Un mensaje de éxito o un mensaje de error
   * @version 15/11/2024
   * @autor Jeimy Pinto
   */
  async register(req, res) {
    console.log("Datos recibidos en req.body:", req.body);
    let parsedData;
    try {
      parsedData = await usuarioSchema.parseAsync(req.body);
    } catch (validationError) {
      console.error("Error de validación:", validationError);
      return res.status(400).json({
        message: "Error de validación",
        errors: validationError.errors,
      });
    }

    const { nombre, apellido, documento, telefono, email, contrasena } =
      parsedData;
    console.log(
      "Datos después de la validación:",
      nombre,
      apellido,
      documento,
      telefono,
      email,
      contrasena
    );

    try {
      const usuario = await Usuario.findOne({ where: { documento } });
      if (usuario) {
        return res.status(400).json({ message: "El usuario ya existe" });
      }

      // No se hashea la contraseña porque el modelo ya lo hace
      const nuevoUsuario = await Usuario.create({
        nombre,
        apellido,
        documento,
        telefono,
        email,
        contrasena,
      });

      console.log("Usuario creado:", nuevoUsuario);

      res.json({ message: "Usuario registrado correctamente" });
    } catch (error) {
      console.error("Error durante el registro:", error);
      if (error.name === "SequelizeValidationError") {
        res
          .status(400)
          .json({ message: "Error de validación", errors: error.errors });
      } else if (error.name === "SequelizeDatabaseError") {
        res
          .status(500)
          .json({ message: "Error de base de datos", error: error.message });
      } else {
        res.status(500).json({
          message: "Error al registrar el usuario",
          error: error.message,
        });
      }
    }
  }
}

module.exports = new AuthController();
