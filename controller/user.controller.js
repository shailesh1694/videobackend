import { asyncErrorHandler } from "../utils/asyncErrorHandler.js";
import { ApiErrorClass } from "../utils/ApiErrorClass.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../model/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import fs from "fs"

const registerUser = asyncErrorHandler(async (req, res) => {
     const { username, email, fullname, password } = req.body;

     if (
          [username, email, fullname, password].some((field) => field?.trim() === "") || !(Array.isArray((req.files.avatar)))
     ) {
          throw new ApiErrorClass(422, "invalid request body!");
     }

     const existingUser = await User.findOne({
          $or: [{ username }, { email }]
     })

     if (existingUser) {
          if (Array.isArray(req.files.coverImage) && req.files.coverImage[0].path === req.files.avatar[0].path) {
               fs.unlinkSync(req.files.avatar[0].path)
          } else {
               fs.unlinkSync(req.files.avatar[0].path)
               Array.isArray(req.files.coverImage) && fs.unlinkSync(req.files.coverImage[0].path)
          }
          throw new ApiErrorClass(409, "user with email or username already exists")
     }

     const avatarPath = req.files.avatar[0].path;

     let converImagePath;
     if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length) {
          converImagePath = req.files.coverImage[0].path;
     }
     const avatar = await uploadOnCloudinary(avatarPath)

     const coverImage = await uploadOnCloudinary(converImagePath)

     if (!avatar) {
          throw new ApiErrorClass(400, "Profile image is Mandatory")
     }
     const user = await User.create({
          fullname,
          email,
          password,
          username: username.toLowerCase(),
          avatar: avatar.url,
          coverImage: coverImage?.url || ""
     })

     res.status(201).json(
          new ApiResponse(200, {}, "user registered successfull")
     );
});

const loginUser = asyncErrorHandler(async (req, res, next) => {
     const { username, password } = req.body;
     console.log(req.body, "reqbody")
     if ([username, password].some((field) => {
          return (field?.trim() === "") || (!(field))
     })) {
          throw new ApiErrorClass(422, "invalid request body!");
     }
     const findUser = await User.findOne({ username }).select("+password")
     if (!findUser) {
          throw new ApiErrorClass(404, "user with username not found !")
     }
     const isPasswordMatch = findUser.isPasswordMatch(password)

     if (!isPasswordMatch) {
          throw new ApiErrorClass(400, "invalid credential not match !")
     }
     const accessToken = findUser.generateAccessToken();
     const refreshToken = findUser.generateRefreshToken();

     if (!accessToken && !refreshToken) {
          throw new ApiErrorClass(500, "internal server error !")
     }

     findUser.refreshToken = refreshToken;
     await findUser.save();

     // res.cookie('accessToken', accessToken, { httpOnly: true })
     // res.cookie('refreshToken', refreshToken, { httpOnly: true })

     res.status(200).json(new ApiResponse(200, { accessToken, refreshToken }, "user login successfull"))
})

const logout = asyncErrorHandler(async (req, res, next) => {

     const logOutUser = await User.findByIdAndUpdate(req.user._id, { $set: { refreshToken: "" } }, { new: true })
     // console.log(logOutUser,"logOutUser")
     return res
          .status(200)
          .clearCookie("accessToken", { httpOnly: true })
          .clearCookie("refreshToken", { httpOnly: true })
          .json(new ApiResponse(200, {},
               "user logout successfull!"
          ))
})

const getAuth = asyncErrorHandler(async (req, res, next) => {
     const accessToken = req.cookies.accessToken
     res.status(200).json(new ApiResponse(200, { accessToken}, "authorized"))
})
export { registerUser, loginUser, logout, getAuth };
