import { Request,Response, response } from "express";
import TeacherUsecase from '../usecase/teacherUsecase'
import Teacher from "../domain/teacher";

class TeacherController {
    constructor(private teacherUsecase:TeacherUsecase){}

    async teacherSignup(req: Request, res: Response){
        try {
            const newTeacher = req.body;
            const teacherExists = await this.teacherUsecase.isEmailExist(newTeacher.email);
            console.log(teacherExists,'teacherExitsts')
            if(teacherExists.data ){
                return res
                .status(401)
                .json({data:{message:"Email already exists"}})
            }
            const verification = await this.teacherUsecase.verifyMail(newTeacher.email);
            console.log(verification);

            req.app.locals.teacher = newTeacher;
            req.app.locals.otp = verification.otp;

            const teacherToSave:Teacher = req.app.locals.teacher as Teacher;

            
                        if(newTeacher && req.body.is_google==true){
                            const savedTeacher = await this.teacherUsecase.saveTeacher(teacherToSave);
                            return res.status(200).json({teacherSave: savedTeacher});
                        }


            return res.status(201).json({response: verification});
        } catch (error) {
            return res.status(500).json({data:{message:"Interval error",
            error:(error as Error).message}});
        }
    }

     async resendOtp(req: Request, res: Response){
        try {
            const teacher = req.app.locals.teacher;
            const emailResponse = await this.teacherUsecase.verifyMail(teacher.email);
            req.app.locals.otp = emailResponse.otp;
            console.log(emailResponse,'sfse')

            setTimeout(()=>{
                req.app.locals.otp = undefined;

            },1000 *30);
            return res.status(200).json({response: emailResponse})
        } catch (error) {
            return res.status(500).json({
                data:{status:500, message:"Internal Server Error",
                    error:(error as Error).message
                }});
        }
     }

    async teacherOtpVerification(req:Request,res:Response){
        try {
            const teacherToSave:Teacher = req.app.locals.teacher as Teacher;
            const generatedOtp = req.app.locals.otp;
            const enteredOtp = req.body.otp;

            if(enteredOtp === generatedOtp){
                const savedTeacher = await this.teacherUsecase.saveTeacher(teacherToSave);
                return res.status(200).json({teacherSave: savedTeacher});
            }else{
                return res.status(401).json({data:{message:"Invalid OTP"}})
            }
        } catch (error) {
            return res.status(500).json({
                success: false,
                message:"Internal Server Error",
                error:(error as Error).message
            })
        }
    }

    async teacherLogin(req: Request, res: Response){
        try {
            const teacher = req.body;
            console.log(teacher)
            const teacherData = await this.teacherUsecase.teacherLogin(teacher);
            return res.status(teacherData.status).json(teacherData);
        } catch (error) {
            return res.status(500).json({
                success: false,
                message:"Internal Server Error",
                error:(error as Error).message
            })
        }
    }
    async teacherlogout(req: Request, res: Response){
        try {
            res.status(200).json('User logged out');
        } catch (error) {
            return res.status(500).json({
                data:{status:500, message:"Internal Server Error",
                    error:(error as Error).message
                }});
        }
    }
}

export default TeacherController;