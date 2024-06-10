import express from "express";
import {
  createTweet,
  editTweet,
  deleteTweet,
  viewTimeline,
  viewTweetByUserId,
} from "../controllers/tweetController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", authMiddleware, createTweet);
router.put("/:tweetId", authMiddleware, editTweet);
router.delete("/:tweetId", authMiddleware, deleteTweet);
router.get("/timeline", authMiddleware, viewTimeline);
router.get("/usertweet", authMiddleware, viewTweetByUserId);
export default router;
