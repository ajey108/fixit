import express from "express";
import { adminLogin } from "../controllers/adminAuthController.js";

const router = express.Router();

//login for admin
router.post("/login", adminLogin);
export default router;
