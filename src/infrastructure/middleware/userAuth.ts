import {Request,Response ,NextFunction}  from 'express';
import { verify,JwtPayload } from 'jsonwebtoken';
import UserRepository from '../repository/userRepository';


const userRepository = new UserRepository();

export const userAuth = async(req: Request,res: Response,next: NextFunction)=>{
    try {
        const token = req.headers.authorization;

        if(token){
            const decoded = verify(token.slice(7),process.env.JWT_KEY as string) as JwtPayload;
            const userData = await userRepository.findUserById(decoded.id);
            if(userData !==null){
                if(userData.isBlocked){
                    res.status(403).json({data:{message:'You are Blocked'}});
                }else{
                    next()
                }
            }else{
                res.status(401).json({data:{message:'Not Authorized ,Invalid Token'}});
            }
        }else{
            res.status(401).json({data:{message:"Token Not Available"}});
        }
    } catch (error) {
        res.status(500).json({data:{message:"Internal Server Error"}})
    }
}