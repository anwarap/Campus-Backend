import {  upload } from "../config/multer";
import { teacherController } from "../utils/controlers";
import { courseController } from "../utils/controlers";
import { categoryController } from "../utils/controlers";

import express from "express";
const teacherRoute = express.Router();

teacherRoute.post('/signup', (req, res) => teacherController.teacherSignup(req, res));
teacherRoute.post('/verify', (req, res) => teacherController.teacherOtpVerification(req, res));
teacherRoute.post('/login', (req, res) => teacherController.teacherLogin(req, res));
teacherRoute.post('/logout', (req, res) => teacherController.teacherlogout(req, res));
teacherRoute.get('/resend-otp', (req, res) => teacherController.resendOtp(req, res));
teacherRoute.post("/forget-password1", (req, res) => teacherController.forgetPassword1(req, res));
teacherRoute.post("/forget-password2", (req, res) => teacherController.forgetPassword2(req, res));
teacherRoute.post("/forget-password-final", (req, res) => teacherController.forgetPassword3(req, res));
teacherRoute.get("/category",(req, res) => categoryController.getCategory(req, res));
teacherRoute.post('/add-course',upload,(req, res) => courseController.createCourse(req, res));


export default teacherRoute;