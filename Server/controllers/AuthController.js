import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";
const maxAge = 3 * 24 * 60 * 60 + 1000;
const createToken = (email,userId) => {
    return jwt.sign({email,userId},process.env.JWT_SECRET_KEY,{expiresIn:maxAge});
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
            maxAge:maxAge,
            secure:true,
            sameSite:"None",
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
        maxAge:maxAge,
        secure:true,
        sameSite:"None",
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