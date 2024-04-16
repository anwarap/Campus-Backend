import { userAuth } from "../middleware/userAuth";
import { userController } from "../utils/controlers";

import express from "express";
const route = express.Router();

route.post("/register", (req, res)=>userController.userSignUp(req, res));
route.post("/verifyOtp", (req, res)=>userController.UserOtpVerification(req, res));
route.get("/resend-otp", (req, res)=>userController.resendOtp(req, res));
route.post("/login", (req, res)=>userController.userLogin(req, res));

export default route;