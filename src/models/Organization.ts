// models/Organization.ts
import mongoose, { Document, Model, Schema } from "mongoose";
import { IUser } from "./User";

export interface IOrganization extends Document {
  name: string;
  slug: string;
  adminId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const OrganizationSchema: Schema<IOrganization> = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    adminId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Organization: Model<IOrganization> =
  mongoose.models.Organization ||
  mongoose.model<IOrganization>("Organization", OrganizationSchema);

export default Organization;
