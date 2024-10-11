import express from "express";
import { router } from "./routes/main.js";
import { sequelize } from "./models/index.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.disable("x-powered-by");
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

app.use("/api", router);

sequelize.sync({ force: false })
  .then(() => {
    console.log("Database synced.");
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Unable to sync database:", err);
  });