import User from "../models/UserModel.js";
import { Message } from "../models/MessagesModel.js";
import mongoose from "mongoose";
export const searchContact = async(req, res) => {
    const { searchTerm } = req.body;
    if(searchTerm === undefined || searchTerm === null) {
        return res.status(400).json({
            message: "Search term is required"
        });
    }

    const sanitizedSearchTerm = searchTerm.replace(
        /[.*+?^${}()|[\]\\]/g, '\\$&'
    );
    const regex = new RegExp(sanitizedSearchTerm, 'i');
    const contacts = await User.find({
        $and:[
            {_id: { $ne: req.userId}},
            {
                $or: [
                    { firstName: regex },
                    { lastName: regex },
                    { email: regex },
                ]
            }
        ]
    }).select('-password');
    return res.status(200).json({
        contacts
    });
}

export const getContactsForDmList = async(req, res) => {
    try {
       let userId=req.userId;
       userId=new mongoose.Types.ObjectId(userId);
       const contacts = await Message.aggregate([
        {$match:{
            $or:[
                {sender:userId},
                {recepient:userId}
            ]
        }},
        {
            $sort:{
                timestamp:-1
            }
        },
        {
            $group:{
                _id:{
                    $cond:{
                        if:{$eq:["$sender",userId]},
                        then:"$recepient",
                        else:"$sender"
                    }
                },
                lastMessageTime:{
                    $first:"$timestamp"
                }
            }
        },
        {
            $lookup:{
                from:"users",
                localField:"_id",
                foreignField:"_id",
                as:"contactInfo"
            }
        },
        {
            $unwind:"$contactInfo"
        },
        {
            $project:{
                _id:1,
                lastMessageTime:1,
                email:"$contactInfo.email",
                firstName:"$contactInfo.firstName",
                lastName:"$contactInfo.lastName",
                image:"$contactInfo.image",
                color:"$contactInfo.color"
            }
        },
        {
            $sort:{
                lastMessageTime:-1
            }
        }
       ])
       return res.status(200).json({
        contacts
       })
    } catch (error) {
        return res.status(500).send("Internal server error")
    }            
}

export const getAllContacts = async(req, res) => {
    try {
        const users = await User.find(
            {_id:{$ne:req.userId}},
            "firstName lastName email _id"
        );
        const contacts = users.map(user => ({
            label: user.firstName ? `${user.firstName} ${user.lastName}` : user.email,
            value: user._id
        }))
        return res.status(200).json({
            contacts
        })
    } catch (error) {
        return res.status(500).send("Internal server error")
    }
}
