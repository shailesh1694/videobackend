import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { loginUser, registerUser, logout ,getAuth} from "../controller/user.controller.js";
import { jwtAuthorization } from "../middlewares/jwtAuthorization.middleware.js";

const router = Router();

router.route("/register").post(
     upload.fields([
          { name: "avatar", maxCount: 1 },
          { name: "coverImage", maxCount: 1 },
     ]),
     registerUser
);
router.route("/login").post(loginUser)
router.route("/logout").post(jwtAuthorization, logout)
router.route("/getUser").get(getAuth)

export default router;
