import express from "express";
import { signup,login,getUserInfo, updateProfile, updateProfileImage,removeProfileImage,logout } from "../controllers/AuthController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
const router = express.Router();
import multer from "multer";

const upload = multer({dest:"uploads/profiles"});
router.post("/signup", signup);
router.post("/login", login);
router.get("/user-info",verifyToken, getUserInfo)
router.post("/update-profile",verifyToken,updateProfile)
router.post("/update-profile-image",verifyToken,  upload.single("profile-image"),updateProfileImage)
router.delete("/remove-profile-image",verifyToken,removeProfileImage)
router.post("/logout",logout);
export default router;