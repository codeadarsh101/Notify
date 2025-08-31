import mongoose, { Schema } from "mongoose";
const noteSchema = new mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, ref: "user", required: true },
    content: { type: String, required: true },
}, { timestamps: true });
const noteModel = mongoose.model("note", noteSchema);
export default noteModel;
//# sourceMappingURL=noteModel.js.map