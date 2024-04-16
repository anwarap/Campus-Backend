import mongoose,{Schema,Document,ObjectId} from "mongoose";

export interface IUsers extends Document {
    _id:ObjectId;
    name:string;
    email:string;
    password:string;
    isBlocked:boolean;
    mobile:string;
    
}


const UserSchema: Schema = new Schema ({
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


const UserModel = mongoose.model<IUsers>('Users',UserSchema);

export default UserModel;