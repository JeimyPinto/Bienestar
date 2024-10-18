const express = require('express');
const authenticate = require('../middlewares/auth');
const getSequelizeInstance = require('../config/database');
const Usuario = require('../models/usuario');
const router = express.Router();

router.use(authenticate);

router.post('/create-usuario', async (req, res) => {
  const { nombre, apellido, documento, telefono, email, contrasena } = req.body;
  const sequelize = getSequelizeInstance(req.user.username, req.user.password);

  try {
    const usuario = await Usuario.create({ nombre, apellido, documento, telefono, email, contrasena }, { sequelize });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

module.exports = router;