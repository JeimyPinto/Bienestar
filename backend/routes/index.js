const usuarioRouter = require('./usuarios.js');

const express = require('express');
const router = express.Router();

router.use('/usuarios', usuarioRouter);

module.exports = router;