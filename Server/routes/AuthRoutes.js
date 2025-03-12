import express from "express";
import { signup,login,getUserInfo, updateProfile } from "../controllers/AuthController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/user-info",verifyToken, getUserInfo)
router.post("/update-profile",verifyToken,updateProfile)
export default router;