import express from "express";
import {createJob, getJobs, getJobById, jobsCreatedByAdmin} from "../controllers/job.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router=express.Router();

router.route("/createjob").post(isAuthenticated,createJob);
router.route("/jobs").get(isAuthenticated, getJobs);
router.route("/admin/job").get(isAuthenticated, jobsCreatedByAdmin);
router.route("/job/:id").get(isAuthenticated, getJobById);

export default router;