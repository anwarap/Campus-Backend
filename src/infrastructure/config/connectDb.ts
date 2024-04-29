import mongoose from "mongoose";


export const connectDb = async ()=>{
    try {
        const MONGO_URI = process.env.MONGO_URI;
        if(MONGO_URI){
            await mongoose.connect(MONGO_URI);
        }
        console.log('db connected successfully')
    } catch (error) {
        console.log(error)
    }
}


