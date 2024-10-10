import { Router } from "express";
import { homeController } from "../controllers/home.js";
import { loginController } from "../controllers/login.js";

const router = Router();

router.get("/", homeController);

router.get('/login', loginController);

export { router };
