const db = require('../models');
const Usuario = db.Usuario;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthController {
    /**
     * Inicia sesión en la aplicación
     * @param {*} req el correo y la contraseña del usuario
     * @param {*} res si el usuario y la contraseña son correctos, retorna un token
     * @returns El token de autenticación o un mensaje de error
     */
  async login(req, res) {
    const { email, password } = req.body;
    try {
      const usuario = await Usuario.findOne({ where: { email } });
      if (!usuario || !bcrypt.compareSync(password, usuario.contrasena)) {
        return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
      }
      const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Error during login', error });
    }
  }

  async register(req, res) {
    const { email, password } = req.body;
    try {
      const hashedPassword = bcrypt.hashSync(password, 10);
      const usuario = await Usuario.create({ email, contrasena: hashedPassword });
      const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Error during registration', error });
    }
  }
}

module.exports = new AuthController();