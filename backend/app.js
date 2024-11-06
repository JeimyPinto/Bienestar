const express = require("express");
const { connectDB } = require("./config/database.js");
require("dotenv").config();
const bodyParser = require("body-parser");
const indexRouter = require("./routes/index.js");
const usuarioRouter = require("./routes/usuarios.js");
const morgan = require("morgan");
const cors = require("cors");
const PORT = process.env.PORT || 4000;

const app = express();

//Validamos que no estemos en ambiente de production
if (process.env.NODE_ENV != "development") {
  //Se carga la configuración archivo .env al process.env
  require("dotenv").config();
}
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // replace '*' with your domain
  next();
});
/**
 * Valida que solo se pueda acceder a la API desde los dominios permitidos
 */
const allowedOrigins = [
  "http://localhost:3000",
  "https://frontendshinydesk.vercel.app",
];
app.use(
  cors({
    origin: function (origin, callback) {
      // Permitir solicitudes sin origen (como las de herramientas de desarrollo)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = "El dominio no está permitido por la política CORS";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);
/**
 * Inhabilitar la cabecera X-Powered-By
 */
app.disable("x-powered-by");
/**
 * Middleware para parsear el body de las peticiones
 * en formato JSON
 */
app.use(express.json());

/**
 * Middleware para registrar las solicitudes HTTP
 */
app.use(morgan("dev"));

/**
 * Ruta principal de la API
 */
app.get("/api", indexRouter);
/**
 * Rutas de los recursos de la API que no existen
 * se envía un mensaje de error
 */
app.use((req, res) => {
  res.status(404).send({ message: "Ruta no encontrada" });
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
