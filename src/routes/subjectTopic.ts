import express from "express";
const router = express.Router();
import {
  addSubjectTopicHandler,
  deleteSubjectTopicHandler,
  getTopicsByPaperIdHandler,
  updateSubjectTopicHandler,
} from "../controllers/subjectTopic.js";
import { authenticateJWT } from "../middleware/index.js";

router.get("/topics/:paperId", authenticateJWT, getTopicsByPaperIdHandler);
router.post("/", authenticateJWT, addSubjectTopicHandler);
router.delete("/:topicId", authenticateJWT, deleteSubjectTopicHandler);
router.put("/:topicId", authenticateJWT, updateSubjectTopicHandler);

export default router;
