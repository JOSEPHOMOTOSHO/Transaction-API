import Joi from "joi";

export const creditSchema = Joi.object({
    amount: Joi.number().required(),
})

export const debitSchema = Joi.object({
    amount: Joi.number().required(),
})
