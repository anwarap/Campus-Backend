import { userController } from "../utils/controlers";
import express from "express";
const userRoute = express.Router();

userRoute.post("/signup", (req, res)=>userController.userSignUp(req, res));
userRoute.post("/verify", (req, res)=>userController.UserOtpVerification(req, res));
userRoute.post("/signin", (req, res)=>userController.userLogin(req, res));
userRoute.post("/logout", (req, res)=>userController.logout(req, res));
userRoute.get("/resend-otp",(req,res)=>userController.resendOtp(req, res));

export default userRoute;