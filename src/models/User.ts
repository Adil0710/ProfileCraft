import mongoose, { Schema, Document } from 'mongoose';

// Shared interface for both personal and organization users
export interface User extends Document {
  username: string;
  email: string;
  password?: string; // Optional for Google OAuth users
  verifyCode: string;
  verifyCodeExpiry: Date;
  isVerified: boolean;
  siteVisible: boolean;
  accountType: 'personal' | 'organization'; // Define account type
  profile?: PersonalProfile | OrganizationProfile; // Profile for either personal or organization
  googleId?: string; // For Google OAuth users
}

// Define personal profile structure
interface PersonalProfile {
  name: string;
  about: string;
  favoriteQuote?: string;
  socialMediaLinks?: { platform: string, link: string }[];
  profilePhoto?: string;
  gender?: string;
  occupation?: string;
}

// Define organization profile structure
interface OrganizationProfile {
  adminId: mongoose.Types.ObjectId; // Reference to admin user
  teamName: string;
  designation: string;
  department?: string;
  bloodGroup?: string;
}

// Schema for User
const UserSchema: Schema<User> = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [/.+\@.+\..+/, 'Please use a valid email address'],
  },
  password: {
    type: String,
    required: function() {
      return !this.googleId; // Password required only for non-Google accounts
    },
  },
  googleId: {
    type: String,
    unique: true, // For Google OAuth users
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
    required: [true, 'Account type is required'],
  },
  profile: {
    type: mongoose.Schema.Types.Mixed, // Either PersonalProfile or OrganizationProfile
    required: [true, 'Profile information is required'],
  },
});

// Create User model
const UserModel = 
  (mongoose.models.User as mongoose.Model<User>) || 
  mongoose.model<User>('User', UserSchema);

export default UserModel;
