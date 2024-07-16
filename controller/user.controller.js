import { asyncErrorHandler } from "../utils/asyncErrorHandler.js";
import { ApiErrorClass } from "../utils/ApiErrorClass.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../model/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";


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
          throw new ApiErrorClass(409, "user with email or username already exists")
     }
     const avatarPath = req.files.avatar[0].path;

     // let converImagePath;
     // if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length) {
     //      converImagePath = req.files.coverImage[0].path;
     // }
     // const avatar = await uploadOnCloudinary(avatarPath)

     // const coverImage = await uploadOnCloudinary(converImagePath)

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

export { registerUser };
