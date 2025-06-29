import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  createIssue,
  allIssues,
  myIssue,
  toggleUpvote,
  deleteComplaint,
} from "../controllers/issueController.js";

import upload from "../utils/multerConfig.js";
import { adminAuth } from "../middleware/adminMiddleware.js";
const router = express.Router();

//create issue route #user
router.post(
  "/createissue",
  authMiddleware,
  upload.single("image"),
  createIssue
);

router.post("/upvote", authMiddleware, toggleUpvote); //upvote
//get route
router.get("/allIssues", allIssues);
router.get("/myIssues", authMiddleware, myIssue);
router.delete("/delete/:id", adminAuth, deleteComplaint);

export default router;
