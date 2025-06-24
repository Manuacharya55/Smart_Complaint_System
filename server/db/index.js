import mongoose from "mongoose";

const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.MOONGO_URL);
    console.log("database connected succesfully")
    } catch (error) {
        console.log(error.message);
    }
}

export default connectDB;