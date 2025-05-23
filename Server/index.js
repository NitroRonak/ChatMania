import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/db.js";
import AuthRoutes from "./routes/AuthRoutes.js";
import ContactRoutes from "./routes/ContactRoutes.js";
import MessageRoutes from "./routes/MessageRoutes.js";
import ChannelRoutes from "./routes/ChannelRoute.js";
import setupSocket from "./socket.js";
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
app.use("/uploads/files",express.static("uploads/files"));
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth",AuthRoutes);
app.use("/api/contacts",ContactRoutes);
app.use("/api/messages",MessageRoutes);
app.use("/api/channel",ChannelRoutes);
const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

setupSocket(server);
