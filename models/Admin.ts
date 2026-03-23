import { Schema, model, models } from "mongoose";

export interface IAdmin {
  username: string;
  passwordHash: string;
}

const AdminSchema = new Schema<IAdmin>(
  {
    username: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true }
);

const Admin = models.Admin || model<IAdmin>("Admin", AdminSchema);
export default Admin;
