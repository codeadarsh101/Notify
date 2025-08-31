import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import userModel, { IUser } from "../models/userModel.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID as string);

export const googleAuth = async (req: Request, res: Response): Promise<void> => {
  try {
    const { token } = req.body  // frontend will send Google ID token

    if (!token) {
      res.status(400).json({ success: false, message: "Google token is required" });
      return;
    }

    // Verify token with Google
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      res.status(400).json({ success: false, message: "Invalid Google token" });
      return;
    }

    const { email, name, sub: googleId } = payload;

    if (!email) {
      res.status(400).json({ success: false, message: "Google account has no email" });
      return;
    }

    // Check if user exists
    let user: IUser | null = await userModel.findOne({ email });

    if (user===null) {
      user = new userModel({
        name,
        email,
        googleId,
      });
      await user.save();
    }

    // Generate JWT
    const authToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET as string,
     
    );

    res.status(200).json({
      success: true,
      token: authToken,
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};
