import { Router } from "express";
import { createChannel } from "../controllers/ChannelController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
const router = Router();

router.post("/create-channel", verifyToken, createChannel);

export default router;
