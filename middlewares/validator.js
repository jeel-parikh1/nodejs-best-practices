import { CustomError, httpStatusCodes } from "../constants/constants.js";

const validator = (schema) => {

    const validatorMiddleware = (req, res, next) => {
        try {
            let data
            console.log(req.body.userEmail)
            data = schema.validate({ ...req.body, ...req.params })
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