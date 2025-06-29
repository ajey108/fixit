import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { createIssue, allIssues } from "../controllers/issueController.js";

import upload from "../utils/multerConfig.js";
const router = express.Router();

//post route #user
router.post(
  "/createissue",
  authMiddleware,
  upload.single("image"),
  createIssue
);

//get route
router.get("/allIssues", allIssues);

export default router;
