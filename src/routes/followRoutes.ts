import express from "express";
import {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
} from "../controllers/followController";
import { authMiddleware } from "../middleware/authMiddleware";
import { getAllUsers } from "../controllers/userController";

const router = express.Router();

router.post("/:userId", authMiddleware, followUser);
router.post("/unfollow/:userId", authMiddleware, unfollowUser);
router.get("/getfollowers", authMiddleware, getFollowers);
router.get("/getfollowing", authMiddleware, getFollowing);
router.get("/getAllUsers", authMiddleware, getAllUsers);

export default router;
