import mongoose, { Schema } from "mongoose";
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    dob: { type: Date, required: false },
}, { timestamps: true } // optional: adds createdAt & updatedAt
);
const userModel = mongoose.model("user", userSchema);
export default userModel;
//# sourceMappingURL=userModel.js.map