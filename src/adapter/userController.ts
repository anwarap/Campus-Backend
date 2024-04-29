import { Request,Response, response } from "express";
import UserUsecase from "../usecase/userUsecase";
import User from "../domain/userd";


class UserController {
    constructor(private userUsecase: UserUsecase){}

    async userSignUp(req: Request, res: Response){
        try {
            const newUser = req.body;
            const userExistence = await this.userUsecase.isEmailExist(newUser.email);
            
            if(userExistence.data){
                return res
                .status(401)
                .json({data:{message:"Email already exists"}})
            }
            const verification = await this.userUsecase.verifyMail(newUser.email);
            console.log(verification,'sdfs')
            
            req.app.locals.user = newUser;
            req.app.locals.otp = verification.otp;



            const userToSave:User = req.app.locals.user as User;
            
                        if(newUser && req.body.is_google==true){
                            const savedUser = await this.userUsecase.saveUser(userToSave);
                            return res.status(200).json({userSave: savedUser});
                        }





            return res.status(201).json({response: verification});

        } catch (error) {
            return res.status(500).json({data:{message:"Interval error",
                error:(error as Error).message}});
        }
    }

    async resendOtp(req: Request, res: Response){
        try {
            const user = req.app.locals.user;
            const emailResponse = await this.userUsecase.verifyMail(user.email);
            console.log(emailResponse,'sfse')
            req.app.locals.otp = emailResponse.otp;

            setTimeout(()=>{
                req.app.locals.otp = undefined;
            },1000 * 30);
            return res.status(200).json({response:emailResponse});
        } catch (error) {
            console.log('here')
            return res.status(500).json({
                data:{status:500, message:"Internal Server Error",
                    error:(error as Error).message
                }});
        }
    }

    async UserOtpVerification(req: Request, res: Response){
        try {
            const userToSave:User = req.app.locals.user as User;
            const generatedOtp = req.app.locals.otp;
            const enteredOtp = req.body.otp;
            console.log(generatedOtp,'generatedOtp')

            if(enteredOtp === generatedOtp){
                const savedUser = await this.userUsecase.saveUser(userToSave);
                return res.status(200).json({userSave: savedUser});
            }else{
                return res.status(401).json({data:{message:"Invalid OTP"}});
               
            }

        } catch (error) {
            return res.status(500).json({
                success: false,
                message:"Internal Server Error",
                error:(error as Error).message
            })
        }
    }

   

    async userLogin(req: Request, res: Response){
        try {
            const user = req.body;
            const userData = await this.userUsecase.userLogin(user);
            return res.status(userData.status).json(userData);
        } catch (error) {
            return res.status(500).json({
                data:{status:500, message:"Internal Server Error",
                    error:(error as Error).message
                }});
        }
    }

    async logout(req: Request, res: Response){
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

export default UserController;