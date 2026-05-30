import express from "express";
import { createCompany, getCompany, getCompanyById, updateCompany } from "../controllers/company.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.route("/create").post(isAuthenticated, createCompany);
router.route("/getcompany").get(isAuthenticated, getCompany);
router.route("/get/:id").get(isAuthenticated, getCompanyById);
router.route("/:id/update").post(isAuthenticated, updateCompany);

export default router;