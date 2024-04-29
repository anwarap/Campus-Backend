import { ImageUpload } from "../config/multer";
import { teacherController } from "../utils/controlers";
import { courseController } from "../utils/controlers";

import express from "express";
const teacherRoute = express.Router();

teacherRoute.post('/signup', (req, res) => teacherController.teacherSignup(req, res));
teacherRoute.post('/verify', (req, res) => teacherController.teacherOtpVerification(req, res));
teacherRoute.post('/login', (req, res) => teacherController.teacherLogin(req, res));
teacherRoute.post('/logout', (req, res) => teacherController.teacherlogout(req, res));
teacherRoute.get('/resend-otp', (req, res) => teacherController.resendOtp(req, res));
teacherRoute.post('/add-course',ImageUpload.single('image'),(req, res) => courseController.createCourse(req, res));


export default teacherRoute;