import { Document, Model } from "mongoose";
export interface IUser extends Document {
    name: string;
    email: string;
    dob: Date;
}
declare const userModel: Model<IUser>;
export default userModel;
//# sourceMappingURL=userModel.d.ts.map