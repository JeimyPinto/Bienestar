const express = require('express');
const { connectDB } = require('./config/database.js');
require('dotenv').config();
const errorHandler = require('./middlewares/errorHandler.js');
const usuarioRouter = require('./routes/usuarios.js');

const app = express();
const PORT = process.env.PORT || 3000;
/**
 * Inhabilitar la cabecera X-Powered-By
 */
app.disable('x-powered-by');
/**
 * Middleware para parsear el body de las peticiones
 * en formato JSON
 */
app.use(express.json());

/**
 * Ruta de bienvenida accesible para cualquier usuario
 */
app.get('/', (req, res) => {
  res.status(200).send({ message: 'Bienvenido a la API de BIENESTAR' });
});

/**
 * Ruta principal de la API
 */
app.get('/api', (req, res) => {
  res.status(200).send({ message: 'API de BIENESTAR' });
});
/**
 * Rutas de la API
 */
app.use('/api/usuarios', usuarioRouter);
/**
 * Rutas de los recursos de la API que no existen
 * se envía un mensaje de error
 */
app.use((req, res) => {
  res.status(404).send({ message: 'Ruta no encontrada' });
});

/**
 * Iniciar el servidor y conectar a la base de datos
 */
const startServer = async () => {
  await connectDB(); 
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
};

startServer();

module.exports = app;