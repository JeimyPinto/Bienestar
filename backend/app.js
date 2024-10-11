import express from "express";
import { router } from "./routes/main.js";
import db from "./models/index.js";
import dotenv from "dotenv";
import config from './config/config.json' assert { type: 'json' }; // Asegúrate de importar correctamente

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.disable("x-powered-by");
app.use(express.json());

// Ruta de prueba
app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

app.use("/api", router);

// Sincronizar la base de datos
db.sequelize.sync({ force: false })
  .then(() => {
    console.log("Database synced.");
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error("Error syncing database:", err);
  });
