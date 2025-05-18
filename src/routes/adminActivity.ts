import express from "express";
import { getReport } from "../controllers/adminActivity.js";
import { authenticateJWT } from "../middleware/index.js";
const router = express.Router();

router.get("/", authenticateJWT, getReport);

export default router;
