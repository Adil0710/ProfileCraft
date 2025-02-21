import mongoose, { Schema, Document } from 'mongoose';

export interface User extends Document {
  username: string;
  email: string;
  password?: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isVerified: boolean;
  siteVisible: boolean;
  accountType: 'personal' | 'organization';

  // Common profile fields for both personal and organization users
  name: string;
  about?: string;
  favoriteQuote?: string;
  socialMediaLinks?: { platform: string; platform_username: string }[];
  profilePhoto?: string;
  gender?: string;
  occupation?: string;
  image?: string;
  location?: string;

  // OAuth-specific fields
  oauthProvider?: string; // e.g., 'google', 'github'
  oauthProviderId?: string; // e.g., Google or GitHub ID
}

const UserSchema: Schema<User> = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    trim: true,
    unique: true,
    lowercase: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [/.+\@.+\..+/, 'Please use a valid email address'],
  },
  password: {
    type: String,
    required: function (this: User) {
      return !this.oauthProvider; // Password is required if not using OAuth
    },
  },
  verifyCode: {
    type: String,
    required: [true, 'Verify Code is required'],
  },
  verifyCodeExpiry: {
    type: Date,
    required: [true, 'Verify Code Expiry is required'],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  siteVisible: {
    type: Boolean,
    default: true,
  },
  accountType: {
    type: String,
    enum: ['personal', 'organization'],
    required: true,
  },

  // Common profile fields
  name: { type: String, required: [true, 'Name is required'] },
  about: { type: String },
  favoriteQuote: { type: String },
  socialMediaLinks: [
    {
      platform: { type: String, required: [true, 'Platform is required'] },
      platform_username: { type: String, required: [true, 'Platform username is required'] },
    },
  ],
  profilePhoto: { type: String },
  gender: { type: String },
  occupation: { type: String },
  image: { type: String },
  location: { type: String },

  // OAuth fields
  oauthProvider: { type: String }, // e.g., 'google', 'github'
  oauthProviderId: { type: String }, // e.g., Google or GitHub user ID
});

const UserModel =
  mongoose.models.User || mongoose.model<User>('User', UserSchema);

export default UserModel;
