import express from "express";
import {
  addQuestionHandler,
  deleteQuestionHandler,
  getQuestionsBySubjectIdHandler,
  updateQuestionHandler,
  getQuestionsBySubjectTopicIdHandler
} from "../controllers/questions.js";
import { authenticateJWT } from "../middleware/index.js";
const router = express.Router();

router.get("/:subjectId", authenticateJWT, getQuestionsBySubjectIdHandler);
router.get('/subjectTopic/:subjectTopicId', authenticateJWT, getQuestionsBySubjectTopicIdHandler);
router.post("/:subTopicId", authenticateJWT, addQuestionHandler);
router.delete("/:questionId", authenticateJWT, deleteQuestionHandler);
router.put("/:questionId", authenticateJWT, updateQuestionHandler);

export default router;