import { Request, Response } from "express";
import WalletService from "../service/WalletService";

const wallet = new WalletService()

export default class WalletController{
    async credit(req:Request, res:Response){
        try{
            const {amount} = req.body;
            const userId = req.userId as string;
            const creditWallet = await wallet.credit(userId, amount);
            if(creditWallet.status){
                 res.status(200).json({
                    message:creditWallet.message,
                    data: creditWallet.data
                })
            }else{
                 res.status(400).json({
                    message: creditWallet.message
                })
            }

            }catch(err:any){
                 res.status(500).json({
                    error: err.message
                })
            }
    }

    async debit(req:Request, res:Response){
        try{
            const {amount} = req.body;
            const userId = req.userId as string;
            const debitWallet = await wallet.debit(userId, amount);
            if(debitWallet.status){
                res.status(200).json({
                    message: debitWallet.message,
                    data: debitWallet.data
                })
            }else{
                res.status(400).json({
                    message: debitWallet.message
                })
            }
        }catch(err:any){
            res.status(500).json({
                error: err.message
            })
        }
    }

    async balance(req:Request, res:Response){
        try{
            const userId = req.userId as string;
            const balance = await wallet.balance(userId);
            if(balance.status){
                res.status(200).json({
                    message: balance.message,
                    data: balance.data
                })
            }else{
                res.status(400).json({
                    message: balance.message
                })
            }
        }catch(err:any){
            res.status(500).json({
                error: err.message
            })
        }
    }
}