import dotenv from "dotenv";
import express from "express";
import { router } from "./routes/main.js";
import { sequelize } from "./models/index.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

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
      console.log(`Server is running on PORT ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });