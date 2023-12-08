import Joi from "joi";

const loginSchema = Joi.object({
    userEmail: Joi.string().trim().email().required(),
    userPassword: Joi.string().trim().required()
})

export default {
    loginSchema
}