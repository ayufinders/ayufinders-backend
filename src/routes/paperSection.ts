import express from "express";
import {
  addPaperSectionHandler,
  deletePaperSectionHandler,
  getPaperSectionInfoByIdHandler,
  getPaperSectionsByPaperIdHandler,
  updatePaperSectionHandler,
} from "../controllers/paperSection.js";
import { authenticateJWT } from "../middleware/index.js";
const router = express.Router();

router.get("/:paperId", authenticateJWT, getPaperSectionsByPaperIdHandler);
router.get(
  "/topics/:paperSectionId",
  authenticateJWT,
  getPaperSectionInfoByIdHandler
);
router.post("/", authenticateJWT, addPaperSectionHandler);
router.delete("/:paperSectionId", authenticateJWT, deletePaperSectionHandler);
router.put("/:paperSectionId", authenticateJWT, updatePaperSectionHandler);

export default router;
