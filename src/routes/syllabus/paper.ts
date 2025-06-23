import express from "express";
import {
  addPaperHandler,
  deletePaperHandler,
  getPaperInfoByIdHandler,
  getPapersBySubjectIdHandler,
  updatePaperHandler,
} from "../../controllers/syllabus/paper.js";
import { authenticateJWT } from "../../middleware/index.js";
const router = express.Router();

router.get("/:subjectId", authenticateJWT, getPapersBySubjectIdHandler);
router.get("/:paperId", authenticateJWT, getPaperInfoByIdHandler);
router.post("/", authenticateJWT, addPaperHandler);
router.delete("/:paperId", authenticateJWT, deletePaperHandler);
router.put("/:paperId", authenticateJWT, updatePaperHandler);

export default router;
