const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/auth');

router.get('/protected-route', authenticateToken, (req, res) => {
  res.json({ message: 'Esta es una ruta protegida', user: req.user });
});

module.exports = router;