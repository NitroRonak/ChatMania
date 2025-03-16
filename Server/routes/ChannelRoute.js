import { Router } from "express";
import { createChannel, getUserChannels,getChannelMessages } from "../controllers/ChannelController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
const router = Router();

router.post("/create-channel", verifyToken, createChannel);
router.get("/get-user-channels", verifyToken, getUserChannels);
router.get("/get-channel-messages/:channelId", verifyToken, getChannelMessages);
export default router;
