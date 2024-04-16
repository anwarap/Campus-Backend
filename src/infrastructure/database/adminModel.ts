import mongoose,{Schema,Document,ObjectId} from "mongoose";

export interface IAdmin extends Document {
    _id: ObjectId,
    email: string,
    password: string
}


const AdminSchema:Schema = new Schema({ 
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
},{
    timestamps:true
})

const AdminModel = mongoose.model<IAdmin>('Admin',AdminSchema);

export default AdminModel;