import mongoose, { Schema, Document, Model } from "mongoose";

 
export interface IUser extends Document {
  name: string;
  email: string;
  dob: Date;
}


const userSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    dob: { type: Date, required: false },
  },
  { timestamps: true } // optional: adds createdAt & updatedAt
);


const userModel: Model<IUser> = mongoose.model<IUser>("user", userSchema);

 
export default userModel;
