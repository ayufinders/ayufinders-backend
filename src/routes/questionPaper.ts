import express from "express";
import {
  deleteQuestionPaper,
  getQuestionPapersBySubjectIdHandler,
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

export default router;
