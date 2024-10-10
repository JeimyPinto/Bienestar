import { Router } from "express";
import { homeController } from "../controllers/home.js";
import { loginController } from "../controllers/login.js";
import {userRouter} from "../routes/user.js";

const router = Router();

router.get("/", homeController);
router.get('/login', loginController);
router.get('/user' ,userRouter);

export { router };
