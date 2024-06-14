import Teacher from "../domain/teacher";
import Encrypt from "../infrastructure/utils/hashPassword";
import TeacherInterface from "./interface/teacherInterface";
import GenerateOtp from "../infrastructure/utils/generateOtp";
import SendOtp from "../infrastructure/utils/nodemailer";
import IJWT from "./interface/jwtInterface";
import User from "../domain/userd";
import UserUsecase from "./userUsecase";



class TeacherUsecase {
    constructor(
        private teacherInterface: TeacherInterface,
        private Encrypt: Encrypt,
        private generateOtp: GenerateOtp,
        private sendOtp: SendOtp,
        private jwt: IJWT
    ){}

    async saveTeacher(teacher:Teacher){
        try {
            const hashedPassword = await this.Encrypt.createHash(teacher.password);
            teacher.password = hashedPassword;

            const teacherData = await this.teacherInterface.saveTeacher(teacher);

            return {
                status: 200,
                data : teacherData
            }
        } catch (error) {
            return {
                status: 400,
                data : error
            }
        }
    }

    async teacherLogin(teacher:Teacher){
        try {
            const teacherFound = await this.teacherInterface.findByEmail(teacher.email);

            if(!teacherFound){
                return {
                    status: 401,
                    data :{
                        message: "Teacher not found"
                    }
                }
            }

            if(teacherFound.isBlocked){
                return {
                    status: 401,
                    data:{message:"you are blocked by admin"}
                }
            }

            const passwordMatch = await this.Encrypt.compare(teacher.password,teacherFound.password);

            if(!passwordMatch){
                return {
                    status:401,
                    data:{
                        message:'Invalid Email or Password'
                    }
                }
            };

            const accessToken = this.jwt.generateAccessToken(teacherFound._id);
            const refreshToken = this.jwt.generateAccessToken(teacherFound._id);
            return {
                status:200,
                data:{
                    teacherData :teacherFound,
                    accessToken,
                    refreshToken
                }
            }
        } catch (error) {
            return {
                status: 400,
                data : error
            }
        }
    }

    async isEmailExist(email:string){
        try {
            const teacherExit = await this.teacherInterface.findByEmail(email);
            return {
                status:200,
                data:teacherExit
            }
            
        } catch (error) {
            return {
                status: 400,
                data : error
            }
        }
    }

    async verifyMail(email:string){
        try {
            const otp = await this.generateOtp.genOtp(6);
            const verify = this.sendOtp.sendVerificationMail(email,otp);
            return{
                status:200,
                otp,
                data:verify,
            }
        } catch (error) {
            return{
                status:400,
                data:error
            }
        }
    }

    async forgetPassword1(email:string){
        const teacher = await this.teacherInterface.findByEmail(email);
        if(teacher){
            return {
                status:200,
                data:"teacher Exists"
            }
        }else{
            return {
                status:401,
                data:{message:"teacher does not exist"}
            }
        }
    }

    async forgetPassword3(data:any){
        const teacher = await this.teacherInterface.findByEmail(data.email);
        if(teacher){
            teacher.password = await this.Encrypt.createHash(data.password);
            await this.teacherInterface.saveTeacher(teacher);
            return {
                status:200,
                data:"password Updated",
            }
        }else{
            return {
                status:401,
                data:{message:"Password is not matching"}
            }
        }
    }
}


export default TeacherUsecase;