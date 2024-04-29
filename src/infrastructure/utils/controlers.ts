import UserRepository from "../repository/userRepository";
import TeacherRepository from "../repository/teacherRepository"
import AdminRepository from "../repository/adminRepository";
import CourseRepository from "../repository/courseRepository";

import Encrypt from "./hashPassword";
import GenerateOtp from "./generateOtp";
import SendOtp from "./nodemailer";
import JwtToken from "./jwt";
import CloudinarySetup from "./cloudinarySetup";


import UserUsecase from "../../usecase/userUsecase";
import TeacherUsecase from "../../usecase/teacherUsecase";
import AdminUsecase from "../../usecase/adminUsecase";
import CourseUsecase from "../../usecase/courseUsecase";

import UserController from "../../adapter/userController";
import TeacherController from "../../adapter/teacherController";
import AdminController from "../../adapter/adminController";
import CourseController from "../../adapter/courseController";

const userRepository = new UserRepository();
const teacherRepository = new TeacherRepository();
const adminRepository = new AdminRepository();
const courseRepository = new CourseRepository();

const encrypt = new Encrypt();
const genOtp = new GenerateOtp();
const sendOtp = new SendOtp();
const jwtToken = new JwtToken();
const cloudinarySetup = new CloudinarySetup();


const userUsecase = new UserUsecase(
    userRepository,
    encrypt,
    genOtp,
    sendOtp,
    jwtToken
);
const teacherUsecase = new TeacherUsecase(
    teacherRepository,
    encrypt,
    genOtp,
    sendOtp,
    jwtToken,
    
);
const adminUsecase = new AdminUsecase(
    adminRepository,
    encrypt,
    jwtToken,
    userRepository,
    teacherRepository,
    
)

const courseUsecase = new CourseUsecase(
    courseRepository,
    cloudinarySetup
)



export const userController = new UserController(userUsecase);
export const teacherController = new TeacherController(teacherUsecase);
export const adminController = new AdminController(adminUsecase);
export const courseController = new CourseController(courseUsecase,cloudinarySetup);