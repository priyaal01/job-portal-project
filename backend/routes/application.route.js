import express from "express";
import { applyJob, getApplication, getApplicants, updateApplicationStatus } from "../controllers/application.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router= express.Router();

router.route("/apply/:id").post(isAuthenticated, applyJob);
router.route("/applications").get(isAuthenticated, getApplication);
router.route("/applicants/:id").get(isAuthenticated, getApplicants);
router.route("/application/:id").put(isAuthenticated, updateApplicationStatus);

export default router;
