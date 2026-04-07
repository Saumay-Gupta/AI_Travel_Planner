import mongoose from "mongoose";


let isConnected = false;
const connectDB = async () =>{
    try {
        if (isConnected) return;
        const connection = await mongoose.connect(`${process.env.MONGODB}`)
        console.log("DB connected Successfully");
        isConnected = true;
    } catch (error) {
        console.log("DB connection failed",error);
    }
}

export default connectDB;