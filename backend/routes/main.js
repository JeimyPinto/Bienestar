import { Router } from "express";
import RegistroController from "../controllers/registro.js";
import validateUsuario from "../middlewares/validationMiddleware.js";

const router = Router();
const registroController = new RegistroController();

// Aplicar el middleware de validación a la ruta de registro
router.post('/register', validateUsuario, (req, res) => registroController.create(req, res));

export { router };