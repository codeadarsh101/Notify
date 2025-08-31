import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IOtp extends Document {
  userId: Types.ObjectId; // reference to User
  code: string;           // OTP value
  expiresAt: Date;        // expiry time
}

const otpSchema: Schema<IOtp> = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "user", required: true },
    code: { type: String, required: true },
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true }
);

const otpModel: Model<IOtp> = mongoose.model<IOtp>("otp", otpSchema);


export default otpModel;
