import { CustomError, httpStatusCodes } from "../constants/constants.js";
import fetchUser from "../databases/services/user/fetchUser.js";
import { verifyToken } from "../helpers/handleToken.js";


const authMiddleware = async (req, res, next) => {
    try {

        // TODO CREATE SAPERATE MIDDLWARE FOR AUTHORIZATION
        const token = req.cookies.token
        if (!token) {
            throw new CustomError(httpStatusCodes.Unauthorized, "Invalid access")
        }
        const decodedUser = verifyToken(token);
        const user = await fetchUser({ userEmail: decodedUser.user.userEmail }, { userName: 1, userEmail: 1, userRole: 1, })
        if (!user) {
            throw new CustomError(httpStatusCodes.Unauthorized, "Invalid access")
        }
        req.user = user;
        return next()
    }
    catch (err) {
        console.log("======= Error AuthMiddleware", err.message)
        return next(err)
    }
}

export default authMiddleware;