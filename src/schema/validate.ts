import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";


export const validate = (schema: ObjectSchema) => {
    return (req:Request, res:Response, next:NextFunction) => {
        const {error} = schema.validate(req.body, {abortEarly: false})
        if(error){
            const errorDetails = error.details.map((detail) => detail.message)
            res.status(400).json({
                success:false,
                message: "Validation error",
                errors: errorDetails
            })
        }else{
            next()
        }
    }

}