import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/db.js";
import AuthRoutes from "./routes/AuthRoutes.js";
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
connectDB();
app.use(cors({
    origin:process.env.ORIGIN,
    methods:["GET","POST","PUT","DELETE","PATCH"],
    credentials:true
}));
app.use("/uploads/profiles",express.static("uploads/profiles"));
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth",AuthRoutes);



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});