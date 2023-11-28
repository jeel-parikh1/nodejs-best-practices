import Joi from "joi";

import { CustomError, httpStatusCodes, userConstants, validatorType } from "../constants/constants.js";


const createUserSchema = Joi.object({
    userName: Joi.string().trim().regex(/^[a-zA-Z]+$/).min(2).required(),
    userEmail: Joi.string().trim().email().required(),
    userPassword: Joi.string().trim().required(),   // Add password pattern according to requirenment
    userGender: Joi.string().valid(...(Object.values(userConstants.GENDER))),
    userRole: Joi.string().valid(...(Object.values(userConstants.ROLES))).required(),
    userDob: Joi.date().max('now')
})

const updateUserSchema = Joi.object({
    id: Joi.string().trim(),
    userName: Joi.string().trim().regex(/^[a-zA-Z]+$/).min(2),
    userEmail: Joi.string().trim().email(),
    userPassword: Joi.string().trim(),   // Add password pattern according to requirenment
    userGender: Joi.string().valid(...(Object.values(userConstants.GENDER))),
    userRole: Joi.string().valid(...(Object.values(userConstants.ROLES))),
    userDob: Joi.date().max('now')
})

const validator = (type) => {

    const validatorMiddleware = (req, res, next) => {
        try {
            let data
            switch (type) {
                case validatorType.CREATE_USER:
                    data = createUserSchema.validate({ ...req.body, ...req.params })
                    break;
                case validatorType.UPDATE_USER:
                    data = updateUserSchema.validate({ ...req.body, ...req.params })
                    break;
                default:
                    throw new CustomError(httpStatusCodes["Internal Server Error"], "Invalid validator type")
            }
            if (data.error) {
                throw new CustomError(httpStatusCodes["Bad Request"], data.error)
            }
            req.validatedData = data.value
            return next()
        }
        catch (err) {
            console.log("======= Error validator", err.message)
            return next(err)
        }
    }

    return validatorMiddleware
}

export default validator