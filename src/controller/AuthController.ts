import { Request, Response } from "express";
import AuthService from "../service/AuthService";

const authService = new AuthService()

export default class AuthController{
    async register(req:Request, res:Response){
        try{
            const {email, password, firstName, lastName} = req.body;
            const register = await authService.register(firstName, lastName, email, password);
            if(register.status){
                res.status(200).json({
                    message: register.message
                })
            }else{
                res.status(400).json({
                    message: register.message
                })
            }
        }catch(err:any){
            res.status(500).json({
                error: err.message
            })
        }
    }

    async login(req:Request, res:Response){
        try{
            const {email, password, token} = req.body;
            const login = await authService.login(email, password, token);
            if(login.status){
                res.status(200).json({
                    data: login.data,
                    message: login.message,
                })
            }else{
                res.status(400).json({
                    error: login.message
                })
            }
        }catch(err:any){
            res.status(500).json({
                error: err.message
            })
        }
    }

    async setupTOTP(req:Request, res:Response){
        try{
            const {userId} = req.body ;
            const qrCodeData = await authService.setupTOTP(userId);
            if(qrCodeData.status){
                res.status(200).json({
                    data: qrCodeData.data,
                    message: qrCodeData.message
                })
            }else{
                res.status(400).json({
                    error: qrCodeData.message
                })
            }
        }catch(err:any){
            res.status(500).json({
                error: err.message
            })
        }
    }

}