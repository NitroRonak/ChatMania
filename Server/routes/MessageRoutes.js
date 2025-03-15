import { Router } from "express";
import { getMessages } from "../controllers/MessageController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";

const router = Router();

router.post("/get-messages", verifyToken,getMessages);

export default router;
