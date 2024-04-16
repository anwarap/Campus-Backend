import UserRepository from "../repository/userRepository";


import Encrypt from "./hashPassword";
import GenerateOtp from "./generateOtp";
import SendOtp from "./nodemailer";
import JwtToken from "./jwt";


import UserUsecase from "../../usecase/userUsecase";


import UserController from "../../adapter/userController";



const userRepository = new UserRepository();


const encrypt = new Encrypt();
const genOtp = new GenerateOtp();
const sendOtp = new SendOtp();
const jwtToken = new JwtToken();


const userUsecase = new UserUsecase(
    userRepository,
    encrypt,
    genOtp,
    sendOtp,
    jwtToken
)



export const userController = new UserController(userUsecase);
