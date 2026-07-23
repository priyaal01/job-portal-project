import { Job } from "../models/job.model.js";

// create job controller for creating a new job
export const createJob = async (req, res) => {
    try {
        const { title, description, requirements, location, salary, position, jobtype, companyId } = req.body;

        if (!title || !description || !requirements || !location || !salary || !position || !jobtype || !companyId) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const userId = req.id;
        if (!userId) {
            return res.status(400).json({ message: "User ID is required to create a job" });
        }

        const requirementsArray = requirements.split(",");
        const job = await Job.create({
            title,
            description,
            requirements: requirementsArray,
            location,
            salary,
            position,
            jobtype,
            company: companyId,
            created_by: userId
        });

        return res.status(201).json({ message: "Job created successfully", job });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
};

// get job controller for getting all jobs
export const getJobs=async(req,res)=>{
    try{
        const keyword=req.query.keyword || "";
        const query={
                $or:[
                    {title:{$regex:keyword,$options:"i"}},
                    {description:{$regex:keyword,$options:"i"}},
                ]
            }
        const jobs=await Job.find(query).populate({path:"company"});
        if(!jobs){
            return res.status(404).json({message:"No job found"})
        }
        return res.status(200).json({message:"Jobs fetched successfully",jobs,success:true})
    }
    catch(error){
        console.log(error);
        res.status(400).json({ message: error.message,success:false});
    }
}


// get job by id controller for getting a job by id

export const getJobById=async(req,res)=>{
    try{
        const jobId=req.params.id;
        const job =await Job.findById(jobId).populate([
            { path: "company" },
            { path: "applications"}
        ]);
        if(!job){
            return res.status(404).json({message:"No job found"})
        }
        return res.status(200).json({message:"Job fetched successfully",job,success:true})
    }
    catch(error){
        console.log(error);
        res.status(400).json({ message: error.message,success:false });
    }
}

// job created by admin
export const jobsCreatedByAdmin = async(req,res)=>{
    try{
        const adminId=req.id;
        const jobs=await Job.find({created_by:adminId});
        if(!jobs){
            return res.status(404).json({message:"No job found"})
        }
        return res.status(200).json({message:"Jobs fetched successfully",jobs})
    }
    catch(error){
        console.log(error);
        res.status(400).json({ message: error.message });
    }
}
