import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export default class AuthMiddleWare{
    async authenticateToken (req: Request, res: Response, next: NextFunction){
        try{
            const token = req.headers.authorization?.split(' ')[1] as string;
            if(!token){
                res.status(400).json({
                    message: "Unauthorized"
                })
                return
            }
            const secret = process.env.SECRET as string;
            const payload = jwt.verify(token, secret) as {userId: string};
            req.userId = payload.userId
            next()
        }catch(err:any){
            res.status(403).json({
                message: err.message
            })
        }
    }
}