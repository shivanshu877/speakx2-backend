import mongoose, { Document, Schema } from "mongoose";

interface IFollow extends Document {
  follower: mongoose.Types.ObjectId;
  following: mongoose.Types.ObjectId;
}

const FollowSchema: Schema<IFollow> = new Schema({
  follower: { type: Schema.Types.ObjectId, ref: "User", required: true },
  following: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

export const Follow = mongoose.model<IFollow>("Follow", FollowSchema);
