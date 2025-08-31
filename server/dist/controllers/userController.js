import userModel from "../models/userModel.js";
import otpModel from "../models/otpModel.js";
import crypto from "crypto";
import { sendMail } from "../config/mailer.js";
export const registerUser = async (req, res) => {
    try {
        const { name, email, dob } = req.body;
        if (!name || !email || !dob) {
            res.status(400).json({ message: "Missing credentials" });
            return;
        }
        // existing user
        let user = await userModel.findOne({ email });
        if (user) {
            res.status(400).json({ message: "User already exists" });
            return;
        }
        const newUser = new userModel({ name, email, dob });
        user = await newUser.save();
        //generate otp..
        const otpRecord = crypto.randomInt(100000, 999999).toString();
        // save otp in otpModel...
        await otpModel.create({
            userId: user._id,
            code: otpRecord, // code is the var.who hold otp value..
            expiresAt: new Date(Date.now() + 5 * 60 * 1000)
        });
        // Send OTP to user email..
        await sendMail(email, "Verify your OTP", `Your OTP is: ${otpRecord}`);
        res.status(201).json({
            success: true,
            message: "OTP sent to email for registration",
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
export const loginUser = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            res.status(400).json({ message: "Enter the Email & DOB" });
            return;
        }
        const user = await userModel.findOne({ email });
        if (!user) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }
        // generate OTP
        const otpRecord = crypto.randomInt(100000, 999999).toString();
        await otpModel.create({
            userId: user._id,
            code: otpRecord,
            expiresAt: new Date(Date.now() + 5 * 60 * 1000),
        });
        await sendMail(email, "Login OTP", `Your login OTP is: ${otpRecord}`);
        res.status(200).json({
            success: true,
            message: "OTP sent to email for login",
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
export const resendOtp = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            res.status(400).json({ success: false, message: "Email is required" });
            return;
        }
        // find user
        const user = await userModel.findOne({ email });
        if (!user) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }
        // generate new otp
        const otpCode = crypto.randomInt(100000, 999999).toString();
        await otpModel.create({
            userId: user._id,
            code: otpCode,
            expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 min expiry
        });
        await sendMail(email, "Resend OTP", `Your OTP is: ${otpCode}`);
        res.status(200).json({
            success: true,
            message: "OTP resent successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
//# sourceMappingURL=userController.js.map