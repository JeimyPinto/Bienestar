import { Router } from "express";
import { TipoUsuarioRouter } from "./TipoUsuario.js";

const router = Router();

router.use("/tipo-usuario", TipoUsuarioRouter);

export {router};
