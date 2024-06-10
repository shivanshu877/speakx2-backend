import { Request, Response } from "express";
import { User } from "../models/User";
import mongoose from "mongoose";

export const followUser = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(req.user.userId);
    const followUser = await User.findById(userId);

    if (!followUser) {
      return res.status(404).send({ message: "User not found" });
    }

    if (!user || !followUser) {
      throw new Error("Invalid user or followUser");
    }
    // @ts-ignore

    if (user.following.includes(followUser._id)) {
      return res.status(400).send({ message: "Already following" });
    }
    // @ts-ignore

    user.following.push(followUser._id);
    // @ts-ignore
    // Push the user ID
    followUser.followers.push(user._id); // Push the user ID

    await user.save();
    await followUser.save();

    res.send({ message: "User followed" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

export const unfollowUser = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(req.user.userId);
    const unfollowUser = await User.findById(userId);

    if (!unfollowUser) {
      return res.status(404).send({ message: "User not found" });
    }

    if (!user || !unfollowUser) {
      throw new Error("Invalid user or unfollowUser");
    }
    // @ts-ignore

    user.following = user.following.filter(
      // @ts-ignore

      (following) => !following.equals(unfollowUser._id.toString()) // Compare IDs
    );
    // @ts-ignore

    unfollowUser.followers = unfollowUser.followers.filter(
      // @ts-ignore

      (follower) => !follower.equals(user._id.toString()) // Compare IDs
    );

    await user.save();
    await unfollowUser.save();

    res.send({ message: "User unfollowed" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

export const getFollowers = async (req: Request, res: Response) => {
  const userId = req.user.userId;

  try {
    const user = await User.findById(userId).populate("followers", "username");
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    // Extract usernames from followers array
    const followersUsernames = user.followers
      .map((follower) => {
        if (typeof follower === "object" && follower.username) {
          return follower.username;
        }
        return null;
      })
      .filter((username) => username !== null);
    // Send followers usernames in the response
    res.send(followersUsernames);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

export const getFollowing = async (req: Request, res: Response) => {
  const userId = req.user.userId;

  try {
    const user = await User.findById(userId).populate("following", "username");
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    // Extract usernames from following array
    const followingUsernames = user.following
      .map((following) => {
        if (typeof following === "object" && following.username) {
          return following.username;
        }
        return null;
      })
      .filter((username) => username !== null);
    // Send following usernames in the response
    res.send(followingUsernames);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
