import mongoose, { Document, Types } from "mongoose";
export interface INote extends Document {
    userId: Types.ObjectId;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}
declare const noteModel: mongoose.Model<INote, {}, {}, {}, mongoose.Document<unknown, {}, INote, {}, {}> & INote & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default noteModel;
//# sourceMappingURL=noteModel.d.ts.map