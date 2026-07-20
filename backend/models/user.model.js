import mongoose from "mongoose";


const userschema= new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phonenumber:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["student","recruiter"],
        default:"student"
    },
    profile:{
        about:{type:String},
        skills:[{type:String}],
        location:{type:String, default:""},
        domain:{type:String, default:""},
        resume:{type:String},
        resumeorignalname:{type:String},
        company:{type:mongoose.Schema.Types.ObjectId, ref:"Company"},
        profilePhoto:{
            type:String,
            default:" "
        },
        
        coverPhoto:{
            type:String,
            default:" "
        }

    }
},{timestamps:true})

export const User=mongoose.model("User",userschema);