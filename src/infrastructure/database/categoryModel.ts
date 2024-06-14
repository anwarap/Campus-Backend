import mongoose,{Schema,Document,ObjectId} from "mongoose";

export interface ICategory extends Document {
    name: string;
    block: boolean;
}



const CategorySchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    block:{
        type:Boolean,
        default:false,
    }
})

const CategoryModel = mongoose.model<ICategory>('Category', CategorySchema);
export default CategoryModel;