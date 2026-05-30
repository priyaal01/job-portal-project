import { Company } from "../models/company.model.js";

// create company controller for creating a new company
export const createCompany=async(req,res)=>{
    try{
        const {companyName}=req.body;
        if(!companyName){
            return res.status(400).json({message:"Company name is required"})
        }
        let company = await Company.findOne({name:companyName});
        if(company){
            return res.status(400).json({message:"Company already exists"})
        }
        company = await Company.create({
            name:companyName,
            userId:req.id
        })
        return res.status(201).json({message:"Company created successfully",company})
    }
    catch(error){
        console.error(error);
        return res.status(500).json({message:"server error is happening in company controller",error:error.message})
    }
}

// get company controller for getting all companies
export const getCompany = async(req,res)=>{
    try{
        const userId=req.id;
        const companies= await Company.find({userId});

        if(!companies){
            return res.status(404).json({message:"No company found"})
        }
        return res.status(200).json({message:"Company fetched successfully",companies})

    }
    catch(error){
        return res.status(500).json({message:"server error is happening in company get controller"})
    }
};



// get company by id controller for getting a company by id
export const getCompanyById = async(req,res)=>{
    try{
        const companyId=req.params.id;
        const company= await Company.findById(companyId);

        if(!company){
            return res.status(404).json({message:"No company found"})
        }
        return res.status(200).json({message:"Company fetched successfully",company})
    }
    catch(error){
        return res.status(500).json({message:"server error is happening in company get by id controller"})
    }
}

// update company controller for updating a company
export const updateCompany = async(req,res)=>{
    try{
        const {name,description,location,website}=req.body;
        const file=req.file;
        // idhar cloudinary ka code aayega file upload karne ke liye

        const updateData={name,description,location,website};
        const companyId=req.params.id;
        const company= await Company.findByIdAndUpdate(companyId,updateData,{new:true});
        if(!company){
            return res.status(404).json({message:"No company found"})
        }
        
        return res.status(200).json({message:"Company updated successfully"})
    }
    catch(error){
        return res.status(500).json({message:"server error is happening in company update controller"})
    }
}

                             