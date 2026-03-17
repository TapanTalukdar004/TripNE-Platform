import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  name?: string;
  username?: string;
  email: string;
  passwordHash?: string;
  image?: string;
  emailVerified?: Date;
  telegramChatId?: string;
  telegramUsername?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, trim: true },
    username: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
    },
    image: { type: String },
    emailVerified: { type: Date },
    telegramChatId: { type: String, sparse: true },
    telegramUsername: { type: String, sparse: true },
  },
  {
    timestamps: true,
  }
);

// Prevent mongoose from recompiling the model if it already exists
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
