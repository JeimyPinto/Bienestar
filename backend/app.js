const express = require("express");
const { connectDB } = require("./config/database.js");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const routes = require("./routes/index.js");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const PORT = process.env.PORT || 4000;

const app = express();

// Validamos que no estemos en ambiente de production
if (process.env.NODE_ENV != "development") {
  // Se carga la configuración archivo .env al process.env
  require("dotenv").config();
}
/**
 * Valida que solo se pueda acceder a la API desde los dominios permitidos
 */
const allowedOrigins = [
  "http://localhost:3001",
  , "http://127.0.0.1:3000 ",
  "https://bienestar-frontend.onrender.com",
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
    credentials: true,
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

/**
 * Ruta principal de la API
 */
app.use("/api", routes);
// Servir archivos estáticos desde el directorio "uploads"
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
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

module.exports = { app };
