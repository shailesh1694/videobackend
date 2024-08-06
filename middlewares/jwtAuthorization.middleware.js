import { User } from "../model/user.model.js";
import { ApiErrorClass } from "../utils/ApiErrorClass.js";
import { asyncErrorHandler } from "../utils/asyncErrorHandler.js";
import jwt from "jsonwebtoken"

export const jwtAuthorization = asyncErrorHandler(async (req, res, next) => {
    const accessToken = req.cookies.accessToken
    // console.log(accessToken, "token")
    if (!accessToken) {
        throw new ApiErrorClass(404, "accessToken not found !")
    }

    try {
        const decodeUser = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
        const findUser = await User.findById(decodeUser._id)

        if (!findUser) {
            throw new ApiErrorClass(404, "Invalid accessToken !")
        }
        req.user = findUser;
        next()
    } catch (error) {
        throw new ApiErrorClass(401, error?.message || "Invalid accessToken!")
    }

})