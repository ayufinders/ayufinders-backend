import express from "express";
const router = express.Router();
import {
  addSubjectHandler,
  deleteSubjectHandler,
  getAllSubjectsHandler,
  getSubjectHandler,
  getSubjectTreeById,
  updateSubjectHandler,
} from "../../controllers/syllabus/subject.js";
import { authenticateJWT } from "../../middleware/index.js";

router.get("/:year", authenticateJWT, getAllSubjectsHandler);
router.post("/", authenticateJWT, addSubjectHandler);
router.delete("/:subjectId", authenticateJWT, deleteSubjectHandler);
router.put("/:subjectId", authenticateJWT, updateSubjectHandler);
router.get("/id/:subjectId", authenticateJWT, getSubjectHandler);
router.get("/tree/:subjectId", getSubjectTreeById);

export default router;
