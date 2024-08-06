import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path"
import { dirname } from "./helper/dirname.js";
import { globalErrorHandle } from "./utils/globalErrorHandle.js";
const __dirname = dirname(import.meta)
const app = express();

app.use(cors({ origin: "http://localhost:5174", credentials: true }))
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use("upload", express.static(path.join(__dirname, "upload")));

app.use(cookieParser());

import userRouter from "./router/user.routes.js";


app.use("/api/v1/users", userRouter);
app.use(globalErrorHandle)

export { app };
