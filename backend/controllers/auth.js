const db = require("../models");
const Usuario = db.Usuario;
const usuarioSchema = require("../schemas/usuario");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class AuthController {
  /**
   * Inicia sesión en la aplicación.
   * Busca un usuario con el correo proporcionado,
   * si lo encuentra, compara la contraseña proporcionada,
   * si la contraseña es correcta, crea un token de autenticación
   * y lo envía en una cookie.
   * @param {*} req el correo y la contraseña del usuario
   * @param {*} res si el usuario y la contraseña son correctos, retorna un token
   * @returns El token de autenticación o un mensaje de error
   * @version 15/11/2024
   * @author Jeimy Pinto
   */
  async login(req, res) {
    const { email, password } = req.body;
    console.log(email, password);
    try {
      const usuario = await Usuario.findOne({ where: { email } });
      if (!usuario || !bcrypt.compareSync(password, usuario.contrasena)) {
        return res
          .status(401)
          .json({ message: "Usuario o contraseña incorrectos" });
      }

      // Crear un token de autenticación
      const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      // Enviar el token en una cookie
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });
      res.json({ message: "Login exitoso" });
    } catch (error) {
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
          message: "Error al obtener el usuario",
          error: error.message,
        });
      }
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
      return res
        .status(400)
        .json({
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
        res.status(400).json({ message: "Error de validación", errors: error.errors });
      } else if (error.name === "SequelizeDatabaseError") {
        res.status(500).json({ message: "Error de base de datos", error: error.message });
      } else {
        res.status(500).json({ message: "Error al registrar el usuario", error: error.message });
      }
    }
  }
}

module.exports = new AuthController();
