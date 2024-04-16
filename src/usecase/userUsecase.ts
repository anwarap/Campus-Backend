import User from "../domain/userd";
import Encrypt from "../infrastructure/utils/hashPassword";
import UserInterface from "./interface/userInterface";
import GenerateOtp from "../infrastructure/utils/generateOtp";
import SendOtp from "../infrastructure/utils/nodemailer";
import IJWT from "./interface/jwtInterface";



class UserUsecase {
    constructor(
        private userInterface: UserInterface,
        private Encrypt : Encrypt,
        private generateOtp : GenerateOtp,
        private sendOtp : SendOtp,
        private jwt : IJWT
    ){}

    async saveUser(user: User) {
        try {
            const hashedPassword = await this.Encrypt.createHash(user.password);
            user.password = hashedPassword

            const userData = await this.userInterface.saveUser(user);

            return {
                status: 200,
                data : userData 
            }
        } catch (error) {
            return {
                status: 400,
                data:error
            }
            
        }
    }

    async userLogin(user: User){
        try {
            const userFound = await this.userInterface.findByEmail(user.email);

            if(!userFound) {
                return {
                    status: 401,
                    data:{
                        message:"User not found"
                    }
                }
            };
            const passwordMatch = await this.Encrypt.compare(user.password,userFound.password);

            if(!passwordMatch){
                return {
                    status:401,
                    data:{
                        message:'Invalid Email or Password'
                    }
                }
            };

            const accessToken = this.jwt.generateAccessToken(userFound._id);
            const refreshToken = this.jwt.generateAccessToken(userFound._id);
            return {
                status:200,
                data:{
                    userData :userFound,
                    accessToken,
                    refreshToken
                }
            }
        } catch (error) {
            return {
                status:400,
                data:error
            }
        }
    }

    async isEmailExist(email:string){
        try{
            console.log('emmm',email)
            const userExit = await this.userInterface.findByEmail(email);
            return {
                status:200,
                data:userExit
            }
        }catch (error) {
            return {
                status:400,
                data:error
            }
        }
    }

    async verifyMail(email:string){
        try {
            const otp = await this.generateOtp.genOtp(6);
            const verify = this.sendOtp.sendVerificationMail(email,otp);
            console.log(verify,'verify')
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
}



export default UserUsecase;