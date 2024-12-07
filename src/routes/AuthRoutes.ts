import express from "express"
import AuthController from "../controller/AuthController"
import AuthMiddleWare from "../middleware/AuthMiddleWare";
import { registerSchema, loginSchema, totpSchema  } from "../schema/authSchema";
import { validate } from "../schema/validate";

const authMiddleWare = new AuthMiddleWare();

const router = express.Router();
const authController = new AuthController();

router.post('/register', validate(registerSchema), authController.register);
router.post('/login', validate(loginSchema),authController.login);
router.post('/setup-totp', validate(totpSchema), authController.setupTOTP);




export default router