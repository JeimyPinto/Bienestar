import express from "express";
import { router } from "./routes/main.js";
import db from "./models/index.js";
import dotenv from "dotenv";

dotenv.config();

// Crear una nueva instancia de Express
const app = express();
const PORT = process.env.PORT;
//Desactivar la cabecera X-Powered-By
app.disable("x-powered-by");
// Habilitar el uso de JSON
app.use(express.json());

// Ruta de prueba
app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});
// Rutas de la API
app.use("/api", router);

/**
 * Iniciar el servidor
 * @returns {Promise<void>} Promesa vacía
 * @author JeimyPinto
 * @version 1.0.0
 */
const startServer = async () => {
  try {
    await db.authenticate();
    console.log("Conexión establecida con la base de datos");
    // Sincronizar con el servidor
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("No se pudo conectar a la base de datos:", error);
    process.exit(1);
  }
};

// Iniciar el servidor
startServer();
