import { Router } from "express";
import { getMessages,uploadFile } from "../controllers/MessageController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import multer from "multer";

const router = Router();
const upload = multer({
    dest: "uploads/files",
});

router.post("/get-messages", verifyToken,getMessages);
router.post("/upload-file", verifyToken,upload.single("file"),uploadFile);

export default router;
