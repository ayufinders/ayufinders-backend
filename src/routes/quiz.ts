import express from "express";
import {
  addCategoryHandler,
  addQuestionHandler,
  deleteCategoryHandler,
  getAllQuizCategoriesHandler,
  getQuizByCategoryIdHandler,
  deleteQuestionHandler,
  updateQuestionHandler,
  updateCategoryHandler,
} from "../controllers/quiz.js";
import { authenticateJWT } from "../middleware/index.js";
const router = express.Router();

router.get("/", authenticateJWT, getAllQuizCategoriesHandler);
router.get("/:categoryId", authenticateJWT, getQuizByCategoryIdHandler);
router.post("/", authenticateJWT, addCategoryHandler);
router.put("/category/:categoryId", authenticateJWT, updateCategoryHandler);
router.post("/:categoryId", authenticateJWT, addQuestionHandler);
router.delete("/:questionId", authenticateJWT, deleteQuestionHandler);
router.put("/question/:questionId", authenticateJWT, updateQuestionHandler);
router.delete("/category/:categoryId", authenticateJWT, deleteCategoryHandler);

export default router;
