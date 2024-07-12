const asyncErrorHandler = (requestHandler) => async (req, res, next) => {
     Promise.resolve(requestHandler(req, res, next)).catch((error) =>
          next(error)
     );
};

export { asyncErrorHandler };

// export const asyncErrorHandler = (fn) => async (req, res, next) => {
//     try {
//         await fn(req, res, next)
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }
