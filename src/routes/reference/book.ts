import express from "express";
import {
  addBookHandler,
  deleteBookHandler,
  getBooksHandler,
  updateBookHandler,
} from "../../controllers/reference/book.js";
import { authenticateJWT } from "../../middleware/index.js";

const router = express.Router();

router.get("/", authenticateJWT, getBooksHandler);
router.post("/", authenticateJWT, addBookHandler);
router.put("/:bookId", authenticateJWT, updateBookHandler);
router.delete("/:bookId", authenticateJWT, deleteBookHandler);

export default router;
