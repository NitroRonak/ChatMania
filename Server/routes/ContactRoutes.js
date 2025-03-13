import express from "express";
import { searchContact } from "../controllers/ContactController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";

const router = express.Router();

router.post("/search", verifyToken, searchContact);

export default router;