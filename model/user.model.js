import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
     {
          username: {
               type: String,
               required: true,
               unique: true,
               lowercase: true,
               trim: true,
          },
          email: {
               type: String,
               required: true,
               unique: true,
               lowercase: true,
               trim: true,
          },
          fullname: {
               type: String,
               required: true,
               lowercase: true,
               trim: true,
          },
          avatar: {
               type: String,
               required: true,
          },
          coverImage: {
               type: String,
          },
          watchHistory: {
               type: Schema.Types.ObjectId,
               ref: "video",
          },
          password: {
               type: String,
               required: [true, "password is required !"],
          },
          refreshToken: {
               type: String,
          },
     },
     { timestamps: true }
);

userSchema.pre("save", async function (next) {
     console.log(this, "this in pre method");
     if (!this.isModified("password")) return next();
     this.password = await bcrypt.hash(this.password, 10);
     next();
});

userSchema.methods.isPasswordMatch = async function (userPassword) {
     return await bcrypt.compare(userPassword, this.password);
};

userSchema.methods.generateAccessToken = async function () {
     return jwt.sign(
          {
               _id: this._id,
               email: this.email,
               username: this.username,
               fullname: this.fullname,
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
     );
};

userSchema.methods.generateRefreshToken = async function () {
     return jwt.sign(
          {
               _id: this._id,
               email: this.email,
               username: this.username,
               fullname: this.fullname,
          },
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
     );
};

export const User = mongoose.model("User", userSchema);
