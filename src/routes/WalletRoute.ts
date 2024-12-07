import express from "express";
import WalletController from "../controller/WalletController";
import AuthMiddleWare from "../middleware/AuthMiddleWare";
import { validate } from "../schema/validate";
import { creditSchema, debitSchema } from "../schema/walletSchema";

const router = express.Router();
const authMiddleWare = new AuthMiddleWare()

const walletController = new WalletController()
router.post('/credit',validate(creditSchema),authMiddleWare.authenticateToken, walletController.credit);
router.post('/debit', validate(debitSchema),authMiddleWare.authenticateToken, walletController.debit);
router.get('/balance', authMiddleWare.authenticateToken, walletController.balance);




export default router