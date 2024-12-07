import Joi from "joi";


export const registerSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required()
})

export const loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
})

export const totpSchema = Joi.object({
    userId: Joi.string().required(),
})