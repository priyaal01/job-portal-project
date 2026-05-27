import mongoose from "mongoose";


const userschema= new mongoose.Schema({
    name:{
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
        enum:["student","recuiter"],
        default:"student"
    },
    profile:{
        bio:{type:String},
        skills:[{type:String}],
        resume:{type:String},
        resumeorignalname:{type:String},
        company:{type:mongoose.Schema.Types.ObjectId, ref:"Company"},
        profilephoto:{
            type:String,
            default:" "

        },

    }
},{timestamps:true})

export const User=mongoose.model("User",userschema);