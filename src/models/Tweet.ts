import mongoose, { Document, Schema } from "mongoose";

interface ITweet extends Document {
  content: string;
  user: mongoose.Types.ObjectId;
  mediaLink?: string;
  createdAt: Date;
}

const TweetSchema: Schema<ITweet> = new Schema({
  content: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  mediaLink: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export const Tweet = mongoose.model<ITweet>("Tweet", TweetSchema);
