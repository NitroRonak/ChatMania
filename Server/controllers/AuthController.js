import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {renameSync,unlinkSync} from "fs";
const createToken = (email,userId) => {
    return jwt.sign({email,userId},process.env.JWT_SECRET_KEY,{expiresIn:24 * 60 * 60 * 1000});
}
export const signup = async (req, res) => {
    try {
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(400).send("Email and password are required");
        }
        const user = await User.findOne({email});
        if(user){
            return res.status(400).send("User already exists");
        }
        const newUser = await User.create({email, password});
        const token = createToken(email,newUser._id);
        res.cookie("jwt",token,{
            maxAge:24 * 60 * 60 * 1000,
            httpOnly: true, 
            secure:true,
            sameSite:"None",
            path: "/"
        });
        return res.status(201).json({
            user:{
                email,
                id:newUser._id,
                profileSetup:newUser.profileSetup
            }
        })
    } catch (error) {
     console.log(error);
     return res.status(500).send("Internal Server Error");
    }
}

export const login = async (req, res) => {
    try {
       const {email,password} = req.body;
       if(!email || !password){
        return res.status(400).send("Email and password are required");
       }
       const user = await User.findOne({email});
       if(!user){
        return res.status(400).send("User does not exist");
       }
       const match = await bcrypt.compare(password,user.password);
       if(!match){
        return res.status(400).send("Invalid credentials");  
       }
       const token = createToken(email,user._id);
       res.cookie("jwt",token,{
        maxAge:24 * 60 * 60 * 1000,
        httpOnly: true, 
        secure:true,
        sameSite:"None",
        path: "/"
       });
       return res.status(200).json({
        user:{
            email,
            id:user._id,
            profileSetup:user.profileSetup,
            firstName:user.firstName,
            lastName:user.lastName,
            image:user.image,
            color:user.color
        }
       })
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error");
    }
}

export const getUserInfo = async (req, res) => {
    try {
        const userData = await User.findById(req.userId);
        if(!userData) return res.status(404).send("User with the given id not found.");

        return res.status(200).json({
            id:userData._id,
            email:userData.email,
            profileSetup:userData.profileSetup,
            firstName:userData.firstName,
            lastName:userData.lastName,
            image:userData.image,
            color:userData.color
        })
    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }
}

export const updateProfile = async (req,res)=>{
    try {
        const {userId} = req;
        const {firstName,lastName,color} = req.body;
        if(!firstName || !lastName){
            return res.status(400).send("firstName lastName and color is required");
        }
        const userData = await User.findByIdAndUpdate(userId,{
            firstName,
            lastName,
            color,
            profileSetup:true
        },{
            new:true,
            runValidators:true
        })

        return res.status(200).json({
            id:userData._id,
            email:userData.email,
            profileSetup:userData.profileSetup,
            firstName:userData.firstName,
            lastName:userData.lastName,
            image:userData.image,
            color:userData.color
        })
    } catch (error) {
        
    }
}

export const updateProfileImage = async (req,res)=>{
    try {
        if(!req.file){
            return res.status(400).send("Image is required");
        }
        const date = new Date();
        let fileName = `${date.getTime()}-${req.file.originalname}`;
        let filePath = `uploads/profiles/${fileName}`;
        renameSync(req.file.path,filePath);
        const userData = await User.findByIdAndUpdate(req.userId,{
            image:filePath
        },{
            new:true,
            runValidators:true
        })
        return res.status(200).json({
            image:userData.image,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error");

    }
}

export const removeProfileImage = async (req,res)=>{
    try {
        const userData = await User.findByIdAndUpdate(req.userId,{
            image:null
        },{
            new:true,
            runValidators:true
        })
        return res.status(200).json({
            id:userData._id,
            email:userData.email,
            profileSetup:userData.profileSetup,
            firstName:userData.firstName,
            lastName:userData.lastName,
            image:userData.image,
            color:userData.color
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error");
    }
}
