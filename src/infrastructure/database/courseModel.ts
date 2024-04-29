import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface ICourse extends Document {
  _id: ObjectId;
  title: String;
  category: String;
  level: String;
  description: String;
  cover: String;
  preview: String;
  instructor: String | ObjectId;
  lesson: Array<String>;
  isApproved: boolean;
}


const CourseSchema: Schema = new Schema({
    title:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    level:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    cover:{
        type: String,
        required: true
    },
    preview:{
        type: String,
        required: true
    },
    instructor:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
    lessson:[
        {
            content:String,
            title:String,
            duration:Number,
        }
    ],
    isApproved:{
        type:Boolean,
        default:false
    }
})


const CourseModel = mongoose.model<ICourse>('Course',CourseSchema);
export default CourseModel;