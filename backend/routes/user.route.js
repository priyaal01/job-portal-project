import express from "express"
import { register, login, logout, updateProfile } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { upload } from "../middlewares/multer.js";
import { User } from "../models/user.model.js";

const router = express.Router()

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/logout").post(logout)
router.route("/profile/update").put(isAuthenticated, upload.fields([
    {
        name: "profilePhoto",
        maxCount: 1
    },
    {
        name: "coverPhoto",
        maxCount: 1
    },


]), updateProfile)

export default router;
