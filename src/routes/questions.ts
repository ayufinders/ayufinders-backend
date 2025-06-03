import express from "express";
import {
  addQuestionHandler,
  deleteQuestionHandler,
  updateQuestionHandler,
} from "../controllers/questions.js";
import { authenticateJWT } from "../middleware/index.js";
const router = express.Router();

router.post("/:subTopicId", authenticateJWT, addQuestionHandler);
router.delete("/:questionId", authenticateJWT, deleteQuestionHandler);
router.put("/:questionId", authenticateJWT, updateQuestionHandler);

export default router;