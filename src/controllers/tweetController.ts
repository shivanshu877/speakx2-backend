import { Request, Response } from "express";
import { Tweet } from "../models/Tweet";
import { User } from "../models/User";

export const createTweet = async (req: Request, res: Response) => {
  const { content, mediaLink } = req.body;
  const tweet = new Tweet({ content, user: req.user.userId, mediaLink });
  await tweet.save();
  res.status(201).send(tweet);
};

export const editTweet = async (req: Request, res: Response) => {
  const { tweetId } = req.params;
  const { content, mediaLink } = req.body;
  const tweet = await Tweet.findById(tweetId);

  if (!tweet) {
    return res.status(404).send({ message: "Tweet not found" });
  }

  if (tweet.user.toString() !== req.user.userId) {
    return res.status(403).send({ message: "Unauthorized" });
  }

  tweet.content = content;
  tweet.mediaLink = mediaLink;
  await tweet.save();

  res.send(tweet);
};

export const deleteTweet = async (req: Request, res: Response) => {
  const { tweetId } = req.params;
  const tweet = await Tweet.findById(tweetId);

  if (!tweet) {
    return res.status(404).send({ message: "Tweet not found" });
  }

  if (tweet.user.toString() !== req.user.userId) {
    return res.status(403).send({ message: "Unauthorized" });
  }

  await Tweet.findByIdAndDelete(tweetId);
  res.send({ message: "Tweet deleted" });
};

export const viewTimeline = async (req: Request, res: Response) => {
  const user = await User.findById(req.user.userId).populate("following");

  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }

  const followingIds = user.following.map((follow: any) => follow._id);
  const tweets = await Tweet.find({ user: { $in: followingIds } })
    .sort({ createdAt: -1 })
    .populate("user");

  res.send(tweets);
};

export const viewTweetByUserId = async (req: Request, res: Response) => {
  try {
   
    const userId = req.user.userId;

    const tweets = await Tweet.find({ user: userId });

    res.json(tweets);
  } catch (error) {
    console.error("Error fetching tweets by user ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
