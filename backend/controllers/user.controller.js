import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { uploadToCloudinary } from "../utils/cloudinaryUpload.js";


// register controller for user registration  
export const register = async (req, res) => {
    try {
        const { fullname, email, phonenumber, password, role } = req.body;
        if (!fullname || !email || !phonenumber || !password) {
            return res.status(400).json({ message: "All fields are required", success: false })
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists", success: false })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        await User.create({
            fullname,
            email,
            phonenumber,
            password: hashedPassword,
            role
        })
        return res.status(201).json({ message: "User registered successfully", success: true })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error", success: false })
    }
};


// login controller for user login 
export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required", success: false })
        }

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials", success: false })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials", success: false })
        }
        if (user.role !== role) {
            return res.status(400).json({ message: "Invalid credentials", success: false })
        }

        const tokendata = {
            userId: user._id,
        }

        const userData = {
            userId: user._id,
            fullname: user.fullname,
            email: user.email,
            phonenumber: user.phonenumber,
            role: user.role,
            profile: {
                location: user.profile?.location || "",
                domain: user.profile?.domain || "",
                about: user.profile?.about || "",
                skills: user.profile?.skills || [],
                profilePhoto: user.profile?.profilePhoto,
                coverPhoto: user.profile?.coverPhoto,
            },
            location: user.profile?.location || "",
            domain: user.profile?.domain || "",
            about: user.profile?.about || "",
            skills: user.profile?.skills || [],
            profilePhoto: user.profile?.profilePhoto,
            coverPhoto: user.profile?.coverPhoto,
        }

        const token = jwt.sign(tokendata, process.env.SECRET_KEY, { expiresIn: "1d" })
        const cookie = {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: "lax",
            path: "/"
        }
        return res.status(200).cookie("token", token, cookie).json({ message: `Welcome Back ${user.fullname}`, user: userData, success: true });

    }
    catch (error) {
        res.status(500).json({ message: "Server error", success: false })
    }
};


// logout controller for user logout
export const logout = async (req, res) => {
    try {
        const cookie = {
            httpOnly: true,
            maxAge: 0,
            sameSite: "lax",
            path: "/"
        }
        return res.status(200).cookie("token", "", cookie).json({ message: "Logout successful", success: true });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", success: false })
    }
};



// update profile controller for user profile update
export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phonenumber, location, domain, about } = req.body;
        const userId = req.id;
        const user = await User.findById(userId);

        const profilePhoto = req.files?.profilePhoto?.[0];
        const coverPhoto = req.files?.coverPhoto?.[0];



        if (!user) {
            return res.status(404).json({ message: "User not found", success: false })
        }

        if (email && email !== user.email) {
            const existingUser = await User.findOne({ email, _id: { $ne: userId } });
            if (existingUser) {
                return res.status(400).json({ message: "Email already in use", success: false });
            }
        }

        if (fullname) user.fullname = fullname;
        if (email) user.email = email;
        if (phonenumber) user.phonenumber = phonenumber;

        user.profile = user.profile || {};
        if (location !== undefined) user.profile.location = location;
        if (domain !== undefined) user.profile.domain = domain;
        if (about !== undefined) user.profile.about = about;
        if (req.body.skills !== undefined) user.profile.skills = req.body.skills;

        if (profilePhoto) {

            const uploadedProfile = await uploadToCloudinary(
                profilePhoto,
                "JobPortal/ProfilePhotos"
            );

            user.profile.profilePhoto = uploadedProfile.secure_url;
        }

        if (coverPhoto) {

            const uploadedCover = await uploadToCloudinary(
                coverPhoto,
                "JobPortal/CoverPhotos"
            );

            user.profile.coverPhoto = uploadedCover.secure_url;
        }

        await user.save();

        const userData = {
            userId: user._id,
            fullname: user.fullname,
            email: user.email,
            phonenumber: user.phonenumber,
            role: user.role,
            profile: {
                location: user.profile?.location || "",
                domain: user.profile?.domain || "",
                about: user.profile?.about || "",
                skills: user.profile?.skills || [],
                profilePhoto: user.profile?.profilePhoto,
                coverPhoto: user.profile?.coverPhoto,
            },
            location: user.profile?.location || "",
            domain: user.profile?.domain || "",
            about: user.profile?.about || "",
            skills: user.profile?.skills || [],
            profilePhoto: user.profile?.profilePhoto,
            coverPhoto: user.profile?.coverPhoto,
        }

        return res.status(200).json({ message: "Profile updated successfully", user: userData, success: true });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error", success: false });
    }
}