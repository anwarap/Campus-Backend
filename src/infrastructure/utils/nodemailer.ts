import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

class SendOtp {
    private transporter:nodemailer.Transporter;
    constructor(){
        this.transporter = nodemailer.createTransport({
            service:'gmail',
            auth :{
                user:"anwaraliap2211@gmail.com",
                pass:process.env.EMAIL_PASSWORD,
            }
        })
    }

    sendVerificationMail(email:string,verif_code:string):void {
        const mailOptions: nodemailer.SendMailOptions = {
            from:"anwaraliap2211@gmail.com",
            to: email,
            subject :'Vertual Campus Email Verification',
            text :`${email}, your verification code is ${verif_code}`,
        };

        this.transporter.sendMail(mailOptions,(err)=>{
            if(err) {
                console.log(err);
            }else{
                console.log('Verification is successful')
            }
        });
    }
}


export default SendOtp;