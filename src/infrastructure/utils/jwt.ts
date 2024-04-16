import jwt from 'jsonwebtoken';
import IJWT from '../../usecase/interface/jwtInterface';
import { ID } from '../../domain/commen';
import { accessTokenExp,refreshTokenExp,tempTokenExp } from './constants';
import { Schema } from 'mongoose';

class JwtToken implements IJWT{

    generateAccessToken(id:ID ): string {
        const jwtKey = process.env.JWT_KEY ;
        if(jwtKey !== undefined){
            const exp = Math.floor(Date.now() / 1000) + accessTokenExp;
            return jwt.sign({id,exp,iat:Date.now()/1000},jwtKey);
        }
        throw new Error("JWT Key not found")
    }

    generateRefreshToken(id: ID): string {
        const jwtKey = process.env.JWT_KEY ;
        if(jwtKey !== undefined){
            const exp = Math.floor(Date.now() / 1000) + refreshTokenExp;
            return jwt.sign({id,exp,iat:Date.now()/1000},jwtKey);
        }
        throw new Error("JWT key not found")
    }
  
}

export default JwtToken