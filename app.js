const express = require('express');
const { connectDB } = require('./config/database');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Rutas de autenticación
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

// Rutas seguras
const secureRoutes = require('./routes/secure');
app.use('/secure', secureRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.status(200).send('Hello World!');
});

const startServer = async () => {
  await connectDB(); // Conectar a la base de datos
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
};

startServer();

module.exports = app;