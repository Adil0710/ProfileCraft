// models/Membership.ts
import mongoose, { Document, Model, Schema } from 'mongoose';
import { IOrganization } from './Organization';
import { IUser } from './User';

export interface IMembership extends Document {
  organizationId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  role: 'admin' | 'member';
  createdAt: Date;
  updatedAt: Date;
}

const MembershipSchema: Schema<IMembership> = new mongoose.Schema(
  {
    organizationId: { type: Schema.Types.ObjectId, ref: 'Organization', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    role: { type: String, enum: ['admin', 'member'], default: 'member' },
  },
  { timestamps: true }
);

// Ensure a user can only be a member of an organization once
MembershipSchema.index({ organizationId: 1, userId: 1 }, { unique: true });

const Membership: Model<IMembership> =
  mongoose.models.Membership || mongoose.model<IMembership>('Membership', MembershipSchema);

export default Membership;
