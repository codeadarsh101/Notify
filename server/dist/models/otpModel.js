import mongoose, { Schema } from "mongoose";
const otpSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "user", required: true },
    code: { type: String, required: true },
    expiresAt: { type: Date, required: true },
}, { timestamps: true });
const otpModel = mongoose.model("otp", otpSchema);
export default otpModel;
//# sourceMappingURL=otpModel.js.map