import express from "express";
import { registerUser,loginUser,resendOtp } from "../controllers/userController.js";
import { verifyOtp } from "../controllers/otpController.js";
import { googleAuth } from "../controllers/googleController.js";
import { authMiddleware } from "../middlewares/auth.js";
import { createNote,notes,deleteNote } from "../controllers/noteController.js";



const userRouter = express.Router();



 
userRouter.post("/register", registerUser);

 userRouter.post("/login", loginUser);  

userRouter.post("/verify-otp", verifyOtp);

userRouter.post("/resend-otp", resendOtp);

userRouter.post('/verify-google',googleAuth)


  // protected routes..
  userRouter.get('/notes',authMiddleware, notes)

 userRouter.post('/notes',authMiddleware, createNote)

 userRouter.delete('/notes/:id',authMiddleware, deleteNote)







export default userRouter;
