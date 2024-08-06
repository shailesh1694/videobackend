export const globalErrorHandle = (error, req, res, next) => {
    // console.log("Error in : ", error.statusCode)
    // console.log("Error in : ", error.message)
    // console.log("Error in : ", error.stack)

    res.status(error.statusCode || 500)
        .json({
            success: false,
            msg: error.message || "internal server error",
        })

}