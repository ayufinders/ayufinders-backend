import express from "express";
import {
  deleteQuestionPaper,
  getQuestionPapersBySubjectIdHandler,
  updateQuestionPaper,
  uploadQuestionPaper,
} from "../controllers/questionPaper.js";
import { authenticateJWT } from "../middleware/index.js";
const router = express.Router();

router.get("/:subjectId", authenticateJWT, getQuestionPapersBySubjectIdHandler);
router.post("/:subjectId", authenticateJWT, uploadQuestionPaper);
router.delete(
  "/:subjectId/:questionPaperId",
  authenticateJWT,
  deleteQuestionPaper
);
router.put(
  "/:questionPaperId",
  authenticateJWT,
  updateQuestionPaper
);

export default router;
