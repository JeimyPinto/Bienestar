const express = require("express");
const { connectDB } = require("./config/database.js");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const routes = require("./routes/index.js");
const morgan = require("morgan");
const cors = require("cors");
const {upload} = require('./config/multerConfig.js');
const PORT = process.env.PORT || 4000;

const app = express();

// Validamos que no estemos en ambiente de production
if (process.env.NODE_ENV != "development") {
  // Se carga la configuración archivo .env al process.env
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
  "http://localhost:3001",
  "https://frontendshinydesk.vercel.app", /*cambiar*/
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
app.use(bodyParser.json());
/**
 * Middleware para registrar las solicitudes HTTP
 */
app.use(morgan("dev"));
/**
 * Middleware para parsear cookies
 */
app.use(cookieParser());

console.log('Multer configuration:', upload);

/**
 * Ruta principal de la API
 */
app.use("/api", routes);
/**
 * Rutas de los recursos de la API que no existen
 * se envía un mensaje de error
 */
app.use((req, res) => {
  res.status(404).send({ message: "Ruta no encontrada" });
});

// Intentamos conectar a la base de datos
connectDB()
  .catch((error) => {
    console.error("Error al conectar a la base de datos:", error.message);
  })
  .finally(() => {
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en: http://localhost:${PORT}`);
    });
  });

module.exports = { app, upload };