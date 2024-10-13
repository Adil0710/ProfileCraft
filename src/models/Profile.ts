// models/Profile.ts
import mongoose, { Document, Model, Schema } from 'mongoose';
import { IUser } from './User';

export interface IProfile extends Document {
  userId: mongoose.Types.ObjectId;
  username: string;
  about?: string;
  favQuote?: string;
  socialLinks?: Record<string, string>;
  profilePhotoUrl?: string;
  gender?: string;
  occupation?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProfileSchema: Schema<IProfile> = new mongoose.Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    username: { type: String, required: true, unique: true },
    about: { type: String },
    favQuote: { type: String },
    socialLinks: { type: Map, of: String },
    profilePhotoUrl: { type: String },
    gender: { type: String },
    occupation: { type: String },
  },
  { timestamps: true }
);

const Profile: Model<IProfile> = mongoose.models.Profile || mongoose.model<IProfile>('Profile', ProfileSchema);

export default Profile;
