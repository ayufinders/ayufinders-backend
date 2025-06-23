import express from "express";
import {
  addBookSectionHandler,
  deleteBookSectionHandler,
  getBookSectionsHandler,
  updateBookSectionHandler,
} from "../../controllers/reference/bookSection.js";
import { authenticateJWT } from "../../middleware/index.js";

const router = express.Router();

router.get("/", authenticateJWT, getBookSectionsHandler);
router.post("/", authenticateJWT, addBookSectionHandler);
router.put("/:bookSectionId", authenticateJWT, updateBookSectionHandler);
router.delete("/:bookSectionId", authenticateJWT, deleteBookSectionHandler);

export default router;
