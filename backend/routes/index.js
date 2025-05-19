const express = require("express");
const router = express.Router();
const path = require("path");
const uploadPath = path.join(__dirname, 'uploads');

// Importar los controladores y middlewares
const userController = require("../controllers/user.js");
const userRoutes = require("./user.js");
const authRouter = require("./auth.js");
const serviceRoutes = require("./service.js");
const authMiddleware = require("../middlewares/auth.js");

router.get("/", (req, res) => {
  res.status(200).send({ message: "Bienvenido a la API de Bienestar" });
});
router.use("/auth", authRouter);
router.use("/users", authMiddleware.authenticateToken, authMiddleware.authorizeRole(), userRoutes);
router.use("/services", serviceRoutes);
router.get(
  "/usersWithServices",
  authMiddleware.authenticateToken,
  authMiddleware.authorizeRole(),
  userController.getUsersWithServices
);
router.use("/uploads", express.static(uploadPath));

module.exports = router;