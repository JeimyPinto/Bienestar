const express = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');
const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, contrasena } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario || !usuario.validPassword(contrasena)) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    const token = jwt.sign({ id: usuario.id, role: usuario.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

module.exports = router;