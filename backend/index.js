import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
dotenv.config();

const app=express();
const PORT=process.env.PORT || 3000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
  origin: "http://localhost:5173", // Update with your frontend URL
  credentials: true, // Allow cookies to be sent
};
app.use(cors(corsOptions));



// server is running 
app.listen(PORT, () => {
    connectDB(); // Connect to the database when the server starts
  console.log(`Server is running on port ${PORT}`);
});


