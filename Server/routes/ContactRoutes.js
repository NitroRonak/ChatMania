import express from "express";
import { getContactsForDmList, searchContact } from "../controllers/ContactController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";

const router = express.Router();

router.post("/search", verifyToken, searchContact);
router.get("/get-contacts-for-dm", verifyToken, getContactsForDmList);

export default router;