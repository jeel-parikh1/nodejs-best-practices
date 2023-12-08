import jwt from "jsonwebtoken";
import { CustomError, httpStatusCodes } from "../constants/constants.js";
import config from "../constants/config.js";


export const genToken = (user) => {
    try {
        const token = jwt.sign({ user }, config.TOKEN_SECRET, { expiresIn: config.TOKEN_EXPIRES });
        return token;
    }
    catch (err) {
        console.log("=====Gen Token", err.message)
        throw new CustomError(httpStatusCodes["Bad Request"], err.message)
    }
}

export const verifyToken = (token) => {
    try {
        const decodedData = jwt.verify(token, config.TOKEN_SECRET);
        return decodedData
    } catch (err) {
        console.log("=====Verify Token", err.message)
        throw new CustomError(httpStatusCodes.Unauthorized, err.message)
    }
}