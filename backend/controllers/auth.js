const db = require('../models');
const Usuario = db.Usuario;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const usuarioCreateSchema = require('../schemas/usuario');

class AuthController {
  /**
   * Registra un usuario en la aplicación.
   * @param {*} req el correo y la contraseña del usuario
   * @param {*} res si el usuario se registró correctamente, retorna un mensaje de éxito
   * @returns Un mensaje de éxito o un mensaje de error
   * @version 15/11/2024
   * @autor Jeimy Pinto
   */
  async register(req, res) {
    let parsedData;
    try {
      parsedData = await usuarioCreateSchema.parseAsync(req.body);
    } catch (validationError) {
      console.error("Error de validación:", validationError);
      return res.status(400).json({ message: "Error de validación", errors: validationError.errors });
    }

    const { nombre, apellido, documento, telefono, email, contrasena } = parsedData;

    try {
      const usuario = await Usuario.findOne({ where: { documento } });
      if (usuario) {
        return res.status(400).json({ message: "Ya existe un usuario con ese documento" });
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

      res.json({ message: "Usuario registrado correctamente", usuario: nuevoUsuario });
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

  /**
   * Inicia sesión en la aplicación.
   * Recibe los datos del usuario, valida los datos según el esquema,
   * @param {*} req el correo y la contraseña del usuario
   * @param {*} res si el usuario y la contraseña son correctos, retorna un token
   * @returns El token de autenticación o un mensaje de error
   * @version 15/11/2024
   * @autor Jeimy Pinto
   */
  async login(req, res) {
    const { email, contrasena } = req.body;
    const secret = process.env.JWT_SECRET;

    try {
      const usuario = await Usuario.findOne({ where: { email } });
      if (!usuario) {
        return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
      }

      const isPasswordValid = bcrypt.compareSync(contrasena, usuario.contrasena);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Usuario o contraseña incorrectos (p)' });
      }

      const token = jwt.sign({ id: usuario.id }, secret, { expiresIn: '1h' });
      res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
      res.json({ message: 'Login exitoso', token });
    } catch (error) {
      console.error("Error durante el login:", error);
      res.status(500).json({ message: 'Error durante el login', error });
    }
  }

  /**
   * Se encarga de cerrar la sesión de un usuario.
   * Recibe la cabecera de autorización, si el token es válido, lo agrega a la lista
   * de tokens no válidos.
   * @version 15/11/2024
   * @param {*} req La cabecera de autorización
   * @param {*} res Si el token es válido, retorna un mensaje de éxito
   */
  logout(req, res) {
    const authHeader = req.headers["authorization"];
    if (authHeader) {
      res.clearCookie('token');
      res.json({ message: 'Logout exitoso' });
    } else {
      res.status(401).send({ status: 401, message: "No autorizado, se requiere el header" });
    }
  }

  /**
   * Verifica el correo electrónico del usuario.
   * @param {*} req El token de verificación
   * @param {*} res Si el token es válido, retorna un mensaje de éxito
   */
  async verifyEmail(req, res) {
    const { token } = req.body;
    const secret = process.env.JWT_SECRET;
    try {
      const payload = jwt.verify(token, secret);
      const user = await Usuario.findByPk(payload.id);
      if (user) {
        await Usuario.update({ emailVerified: true }, { where: { id: user.id } });
        res.status(200).send({ status: 200, data: user });
      }
    } catch (error) {
      res.status(error.status || 500).send({ status: "Ocurrió un fallo", data: error.message });
    }
  }
}

module.exports = new AuthController();
