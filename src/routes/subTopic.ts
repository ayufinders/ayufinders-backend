import express from "express";
const router = express.Router();
import {
  addSubTopicHandler,
  deleteDoc,
  deleteSubTopicHandler,
  deleteVideo,
  getSubTopicsBySubjectTopicIdHandler,
  getSubTopicsInfoByIdHandler,
  updateSubTopicHandler,
  uploadDocs,
  uploadVideo,
} from "../controllers/subTopic.js";
import { authenticateJWT } from "../middleware/index.js";

router.get("/topics/:subjectTopicId", authenticateJWT, getSubTopicsBySubjectTopicIdHandler);
router.get("/:subTopicId", authenticateJWT, getSubTopicsInfoByIdHandler);
router.post("/", authenticateJWT, addSubTopicHandler);
router.delete("/:subTopicId", authenticateJWT, deleteSubTopicHandler);
router.put("/:subTopicId", authenticateJWT, updateSubTopicHandler);
router.put('/video/upload/:subTopicId', authenticateJWT, uploadVideo)
router.put('/docs/upload/:subTopicId', authenticateJWT, uploadDocs)
router.put('/video/delete/:subTopicId/:videoId', authenticateJWT, deleteVideo)
router.put('/docs/delete/:subTopicId/:docId', authenticateJWT, deleteDoc)

export default router;
