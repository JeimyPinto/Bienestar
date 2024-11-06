const usuarioRouter = require('./usuarios.js');
const authController = require('../controllers/auth.js');

const express = require('express');
const router = express.Router();

router.use('/usuarios', usuarioRouter);
router.post('/login', authController.login);
router.post('/register', authController.register);

module.exports = router;