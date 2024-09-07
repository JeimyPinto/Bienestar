import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import { router } from "./routes/main.js";
import { db } from "./model/main.js";

const app = express();

const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//test
app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

app.use("/api", router);

db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Drop and re-sync db.");
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
