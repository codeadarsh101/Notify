import { Document, Model, Types } from "mongoose";
export interface IOtp extends Document {
    userId: Types.ObjectId;
    code: string;
    expiresAt: Date;
}
declare const otpModel: Model<IOtp>;
export default otpModel;
//# sourceMappingURL=otpModel.d.ts.map