import express from "express";
import { getContactsForDmList, searchContact, getAllContacts } from "../controllers/ContactController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";

const router = express.Router();

router.post("/search", verifyToken, searchContact);
router.get("/get-contacts-for-dm", verifyToken, getContactsForDmList);
router.get("/get-all-contacts", verifyToken, getAllContacts);

export default router;