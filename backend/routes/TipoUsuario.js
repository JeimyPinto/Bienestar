import { Router } from "express";
import { TipoUsuarioController } from "../controllers/TipoUsuario.js";

const router = Router();

router.post("/create", TipoUsuarioController.create);


export const TipoUsuarioRouter = router;