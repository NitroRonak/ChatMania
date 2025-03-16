import mongoose from "mongoose";
import { Channel } from "../models/ChannelModel.js";
import User from "../models/UserModel.js";
export const createChannel = async (req, res) => {
    try {
        const { name, members } = req.body;
        
        const admin = await User.findById(req.userId);
        if (!admin) {
            return res.status(404).send("Admin not found");
        }

        const validateMembers = await User.find({ _id: { $in: members } });
        
        if (validateMembers.length !== members.length) {
            return res.status(400).send("Invalid members");
        }
        const newChannel = new Channel({ name, members, admin });
        await newChannel.save();
        res.status(201).json({
            message: "Channel created successfully",
            channel: newChannel
        });
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
}

export const getUserChannels = async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.userId);
        const channels = await Channel.find({ 
            $or: [
                { admin: userId },
                { members: userId }
            ]
         }).sort({ updatedAt: -1 });
        res.status(200).json({
            message: "Channels fetched successfully",
            channels: channels
        });
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
}