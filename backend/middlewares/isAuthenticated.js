import jwt from "jsonwebtoken";


const isAuthenticated = async(req,res,next)=>{
    try{
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({message:"Unauthorized"})
        }

        const decode = jwt.verify(token,process.env.SECRET_KEY);
        req.id = decode.userId;
        next();

        if(!decode){
            return res.status(401).json({message:"Unauthorized"})
        }


    }
    catch(error){
        res.status(500).json({message:"Server error"})
    }
};


export default isAuthenticated;