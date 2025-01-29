import express from "express";

import { authenticateJWT } from "../middleware/index.js";
import {
  addUniversityHandler,
  deleteUniversityHandler,
  getUniversitiesHandler,
  updateUniversityHandler,
} from "../controllers/university.js";
const router = express.Router();

router.post("/", authenticateJWT, addUniversityHandler);
router.get("/", authenticateJWT, getUniversitiesHandler);
router.delete("/:id", authenticateJWT, deleteUniversityHandler);
router.put("/:id", authenticateJWT, updateUniversityHandler);

export default router;
