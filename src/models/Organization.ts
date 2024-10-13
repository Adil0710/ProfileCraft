import mongoose, { Schema, Document } from 'mongoose';

export interface Organization extends Document {
  teamName: string;
  adminId: mongoose.Schema.Types.ObjectId;
  members: mongoose.Schema.Types.ObjectId[]; // references User model
  createdAt: Date;
}

const OrganizationSchema: Schema<Organization> = new mongoose.Schema({
  teamName: {
    type: String,
    required: [true, 'Team/Organization name is required'],
    unique: true,
  },
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User', // Admin of the team
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // List of users part of the organization
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const OrganizationModel =
  mongoose.models.Organization ||
  mongoose.model<Organization>('Organization', OrganizationSchema);

export default OrganizationModel;
