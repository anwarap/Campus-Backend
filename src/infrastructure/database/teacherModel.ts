import { IRouterMatcher } from "express";
import mongoose,{Schema,Document,ObjectId} from "mongoose";

export interface ITeacher extends Document {
    _id:ObjectId;
    name:string;
    email:string;
    password:string;
    isBlocked:boolean;
    mobile:string;
    
}


const TeacherSchema: Schema = new Schema ({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
    },
    password:{
        type:String,
        required:true
    },
    isBlocked:{
        type:Boolean,
        default:false
    },
    mobile:{
        type:String,
    }


},{
    timestamps:true
});


const TeacherModel = mongoose.model<ITeacher>('Teacher',TeacherSchema);

export default TeacherModel;