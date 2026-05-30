import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


// register controller for user registration  
export const register=async(req,res)=>{
    try {
        const {name,email,phonenumber,password,role}=req.body;
        if(!name || !email || !phonenumber || !password){
            return res.status(400).json({message:"All fields are required"})
        }

        const user=await User.findOne({email});
        if(user){
            return res.status(400).json({message:"User already exists"})
        }
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
        await User.create({
            name,
            email,
            phonenumber,
            password:hashedPassword,
            role
        })
        return res.status(201).json({message:"User registered successfully"})
    }
    catch (error) {
        res.status(500).json({message:"Server error"})
    }
};


// login controller for user login 
export const login= async(req,res)=>{
    try{
        const {email,password,role}=req.body;
        if(!email || !password){
            return res.status(400).json({message:"All fields are required"})
        }

        let user=await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"Invalid credentials"})
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid credentials"})
        }
        if(user.role!==role){
            return res.status(400).json({message:"Invalid credentials"})
        }

        const tokendata={
            userId:user._id,
        }

        const userData={
            userId:user._id,
            name:user.name,
            email:user.email,
            phonenumber:user.phonenumber,
            role:user.role,
        }

        const token=jwt.sign(tokendata,process.env.SECRET_KEY,{expiresIn:"1d"})
        const cookie={
            httpOnly:true,
            maxAge:24*60*60*1000,
            sameSite:"strict",
        }
        return res.status(200).cookie("token",token,cookie).json({message:"Login successful",user:userData});
        
    }
    catch(error){
        res.status(500).json({message:"Server error"})
    }
};


// logout controller for user logout
export const logout=async(req,res)=>{
    try{
        const cookie={
            httpOnly:true,
            maxAge:0,
            sameSite:"strict",
        }
        return res.status(200).cookie("token","",cookie).json({message:"Logout successful"});
    }
    catch(error){
        res.status(500).json({message:"Server error"})
    }
};



// update profile controller for user profile update
export const updateProfile=async(req,res)=>{
    try{
        const {name,email,phonenumber,bio,skills}=req.body;
        const file=req.file;

        // cloudinary me file upload karna hai




        let skillsarray;
        if(skills){
            skillsarray=skills.split(",");}
        // middleware se id milta hai
        const userId=req.id;
        const user=await User.findById(userId);
        if(!user){
            return res.status(404).json({message:"User not found"})
        }

        if(name) user.name=name;
        if(email) user.email=email;
        if(phonenumber) user.phonenumber=phonenumber;
        if(bio) user.profile.bio=bio;
        if(skills) user.profile.skills=skillsarray;

        
        // resume upload karna hai



        await user.save();
            const userData={
            userId:user._id,
            name:user.name,
            email:user.email,
            phonenumber:user.phonenumber,
            role:user.role,
        }
        return res.status(200).json({message:"Profile updated successfully", userData});
    }
    catch(error){
        return res.status(500).json({message:"Server error"})
    }
}


