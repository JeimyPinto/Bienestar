// =======================
// Librerías principales
// =======================
const express = require("express");
const path = require("path");

// =======================
// Variables de entorno
// =======================
// Carga las variables de entorno desde el archivo adecuado
if (process.env.NODE_ENV === "development") {
  require("dotenv").config({ path: ".env_local" });
} else {
  require("dotenv").config(); 
}
const PORT = process.env.PORT || 4000;

// =======================
// Base de datos
// =======================
// Importa la función para conectar a la base de datos
const { connectDB } = require("./config/database.js");
const db = require("./models");

// =======================
// Middlewares
// =======================
const bodyParser = require("body-parser");
const cors = require("cors");

// =======================
// Ruteo
// =======================
// Importa las rutas principales de la API
const routes = require("./routes/index.js");

// =======================
// Herramientas de desarrollo
// =======================
const morgan = require("morgan");
const chalk = require("chalk");

// =======================
// Documentación API
// =======================
// (Swagger eliminado)

// Define colores para cada método
const methodColors = {
  GET: chalk.blue.bold,
  POST: chalk.green.bold,
  PUT: chalk.yellow.bold,
  DELETE: chalk.red.bold,
  PATCH: chalk.magenta.bold,
};
const statusColors = {
  2: chalk.green.bold,   // 2xx Success
  3: chalk.cyan.bold,    // 3xx Redirect
  4: chalk.yellow.bold,  // 4xx Client error
  5: chalk.red.bold,     // 5xx Server error
};
const app = express();

// =======================
// Configuración de CORS
// =======================
// Solo permite solicitudes desde los orígenes definidos
const corsOptions = {
  origin: function (origin, callback) {
    // Permitir requests sin origin (por ejemplo, aplicaciones móviles)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      "http://localhost:3000", // Desarrollo local
      "https://bienestar-t7js.onrender.com", // Tu frontend en Render
      "https://bienestarcpic.onrender.com", // Si tienes otro dominio
      "https://bienestar-backend.onrender.com", // Dominio del backend
      "https://03phlgf1-3000.use2.devtunnels.ms"
    ];
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log(chalk.yellow(`🚫 CORS: Origen no permitido: ${origin}`));
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: [
    "Content-Type", 
    "Authorization", 
    "Origin", 
    "X-Requested-With", 
    "Accept",
    "Access-Control-Request-Method",
    "Access-Control-Request-Headers"
  ],
  exposedHeaders: ["Content-Length", "X-Foo", "X-Bar"],
  preflightContinue: false,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// =======================
// Seguridad y utilidades
// =======================
// Oculta la cabecera X-Powered-By
app.disable("x-powered-by");

// Middleware para parsear el body de las peticiones en formato JSON
app.use(bodyParser.json());

// =======================
// Logger HTTP personalizado
// =======================
morgan.token("colored-method", (req) => {
  const color = methodColors[req.method] || ((txt) => txt);
  return color(req.method);
});
morgan.token("colored-status", (req, res) => {
  const status = res.statusCode;
  const color = statusColors[Math.floor(status / 100)] || ((txt) => txt);
  return color(status);
});
// Formato personalizado
const customFormat = ":colored-method :url :colored-status :response-time ms - :res[content-length]";
app.use(morgan(customFormat));

// =======================
// Rutas principales y archivos estáticos
// =======================
// Rutas de la API
app.use("/api", routes);
// Servir archivos estáticos desde el directorio "uploads"
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// Servir imágenes públicas (logos para emails)
app.use("/images", express.static(path.join(__dirname, "public", "images")));

// =======================
// Documentación Swagger protegida
// =======================
// (Ahora se monta en el router de /api, no aquí)

// =======================
// Manejo de rutas no encontradas
// =======================
app.use((req, res, next) => {
  next({
    status: 404,
    message: "Ruta no encontrada / Route not found",
    details: { path: req.originalUrl }
  });
});

// =======================
// Middleware global de manejo de errores
// =======================
const errorHandler = require("./middlewares/errorHandler");
app.use(errorHandler);

// =======================
// Conexión a la base de datos y arranque del servidor
// =======================
// Intenta conectar a la base de datos y, si tiene éxito, inicia el servidor
connectDB(db.sequelize)
  .catch((error) => {
    console.error(chalk.red.bold("❌ Error al conectar a la base de datos:"), chalk.red(error.message));
  })
  .finally(() => {
    app.listen(PORT, () => {
      console.log(chalk.green.bold("🚀 Servidor corriendo en:"), chalk.cyan.underline(`http://127.0.0.1:${PORT}`));
    });
  });

module.exports = { app };