import express from "express";
const router = express.Router();
import {
  addSubjectHandler,
  deleteSubjectHandler,
  getAllSubjectsHandler,
  updateSubjectHandler,
} from "../controllers/subject.js";
import { authenticateJWT } from "../middleware/index.js";

router.get("/:year", authenticateJWT, getAllSubjectsHandler);
router.post("/", authenticateJWT, addSubjectHandler);
router.delete("/:subjectId", authenticateJWT, deleteSubjectHandler);
router.put("/:subjectId", authenticateJWT, updateSubjectHandler);

export default router;
