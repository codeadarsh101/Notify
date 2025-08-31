import otpModel from "../models/otpModel.js";
import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken';
export const verifyOtp = async (req, res) => {
    try {
        const { email, code } = req.body;
        if (!email || !code) {
            res
                .status(400)
                .json({ success: false, message: "Email and OTP are required" }); // server msg
            return;
        }
        // finding user
        const user = await userModel.findOne({ email });
        if (!user) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }
        // finding otp code ..
        const otpRecord = await otpModel
            .findOne({ userId: user._id })
            .sort({ createdAt: -1 });
        if (!otpRecord) {
            res.status(400).json({ success: false, message: "OTP not found" });
            return;
        }
        //check expiry.
        if (otpRecord.expiresAt < new Date()) {
            res.status(400).json({ success: false, message: "OTP expired" });
            return; // no code run further
        }
        // check match..
        if (otpRecord.code != code) {
            res.status(400).json({ success: false, message: "Invalid OTP" });
            return;
        }
        //Otp is valid now gen. JWT..
        const token = jwt.sign({
            id: user._id,
        }, process.env.JWT_SECRET);
        res.json({
            success: true,
            token,
            message: "OTP verified Successfully",
            user: {
                name: user.name,
                email: user.email
            },
        });
        await otpModel.deleteMany({ userId: user._id });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
//# sourceMappingURL=otpController.js.map