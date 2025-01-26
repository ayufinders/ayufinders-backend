import express from "express";
import {
  addTagHandler,
  getTagsHandler,
  deleteTagHandler,
  updateTagHandler,
} from "../controllers/tag.js";
import { authenticateJWT } from "../middleware/index.js";
const router = express.Router();

router.post("/", authenticateJWT, addTagHandler);
router.get("/", authenticateJWT, getTagsHandler);
router.delete("/:tagId", authenticateJWT, deleteTagHandler);
router.put("/:tagId", authenticateJWT, updateTagHandler);

export default router;
