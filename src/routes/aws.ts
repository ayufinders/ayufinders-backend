import express from "express";
import { deleteResource, generatePresignedUrl } from "../controllers/aws.js";
import { authenticateJWT } from "../middleware/index.js";
const router = express.Router();

router.post("/generate-presigned-url", authenticateJWT, generatePresignedUrl);
router.delete("/delete-resource/:key", authenticateJWT, deleteResource);

export default router;
