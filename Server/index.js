import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/db.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
app.use(cors({
    origin:process.env.ORIGIN,
    methods:["GET","POST","PUT","DELETE","PATCH"],
    credentials:true
}));
app.use(cookieParser());
app.use(express.json());
connectDB();


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});