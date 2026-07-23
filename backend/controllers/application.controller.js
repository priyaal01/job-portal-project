import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

// controller for applying to a job
export const applyJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const userId = req.id;
        if (!jobId) {
            return res.status(400).json({ message: "Job ID is required" })
        }
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });
        if (existingApplication) {
            return res.status(400).json({ message: "You have already applied for this job" })
        }
        const job = await Job.findById(jobId).populate({ path: "applications" });
        if (!job) {
            return res.status(404).json({ message: "Job not found" })
        }
        const application = await Application.create({
            job: jobId,
            applicant: userId,
            userId: userId
        })
        job.applications.push(application._id);
        await job.save();
        return res.status(201).json({ message: "Application submitted successfully", application, success: true });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message, success: false });
    }
}


// controller for getting all applications
export const getApplication = async (req, res) => {
    try {
        const userId = req.id;
        const applications = await Application.find({ applicant: userId }).sort({ createdAt: -1 }).populate({
            path: "job",
            options: { sort: { createdAt: -1 } },
            populate: {
                path: "company",
                options: { sort: { createdAt: -1 } }
            }
        })
        if (!applications) {
            return res.status(404).json({ message: "No application found" })
        }
        return res.status(200).json({ message: "Applications fetched successfully", applications })
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
};

// get applicants controller for admin
export const getApplicants = async (req, res) => {
    try {
        const adminId = req.id;
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: "applications",
            options: { sort: { createdAt: -1 } },
            populate: {
                path: "applicant",
                options: { sort: { createdAt: -1 } }
            }
        });
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }
        return res.status(200).json({ message: "Applicants fetched successfully", applicants: job.applications })
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
};

// update application status controller for admin
export const updateApplicationStatus = async (req, res) => {
    try {
        const applicationId = req.params.id;
        const { status } = req.body;
        if (!status) {
            return res.status(400).json({ message: "Status is required" })
        }
        const application = await Application.findById(applicationId).populate("job");
        if (!application) {
            return res.status(404).json({ message: "Application not found" })
        }
        application.status = status;
        await application.save();
        return res.status(200).json({ message: "Application status updated successfully", application })
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
}