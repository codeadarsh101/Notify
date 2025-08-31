import mongoose, { Schema, Document,Types } from "mongoose";

export interface INote extends Document {
  userId: Types.ObjectId;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const noteSchema = new mongoose.Schema<INote>(
    {
  userId: { type: Schema.Types.ObjectId, ref: "user", required: true },
  content: { type: String, required: true },

  },
    {timestamps:true}
);

 const noteModel=mongoose.model<INote>("note",noteSchema)
 
 export default noteModel;
