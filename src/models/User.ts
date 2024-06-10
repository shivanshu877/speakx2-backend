import mongoose, { Document, Schema } from "mongoose";

interface IUser extends Document {
  username: string;
  password: string;
  followers: mongoose.Types.ObjectId[] | IUser[];
  following: mongoose.Types.ObjectId[] | IUser[];
}

const UserSchema: Schema<IUser> = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  following: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

export const User = mongoose.model<IUser>("User", UserSchema);
